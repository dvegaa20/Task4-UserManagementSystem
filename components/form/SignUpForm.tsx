import { ReusableForm } from "./Form";
import { z } from "zod";
import { SignUpFormValidation } from "@/lib/validation";
import { createUser } from "@/lib/actions/user.actions";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { DialogPopUp } from "../DialogPopUp";
import { formatDateTime } from "@/lib/utils";

export default function SignUpForm() {
  const router = useRouter();
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  async function onSubmit({
    name,
    email,
    password,
  }: z.infer<typeof SignUpFormValidation>) {
    setIsLoading(true);
    setIsError(false);

    try {
      const userData = { name, email, password };
      const newUser = await createUser(userData);

      if ("error" in newUser!) {
        setIsError(true);
      } else {
        if (newUser) {
          router.push(`/dashboard`);
        }
      }
    } catch (error) {
      console.error(error);
    }
    setIsLoading(false);
  }

  return (
    <>
      {isError && (
        <DialogPopUp
          messageTitle="Sign Up Failed"
          messageContent="This email is already associated with an existing account. Please use a different email address or log in."
        />
      )}
      <ReusableForm
        schema={SignUpFormValidation}
        defaultValues={{
          name: "",
          email: "",
          password: "",
          confirmPassword: "",
        }}
        fields={[
          { name: "name", label: "Name", placeholder: "Enter your name." },
          {
            name: "email",
            label: "Email",
            placeholder: "Enter your email.",
            type: "email",
          },
          {
            name: "password",
            label: "Password",
            placeholder: "Enter your password.",
            type: "password",
          },
          {
            name: "confirmPassword",
            label: "Confirm Password",
            placeholder: "Re-enter password.",
            type: "password",
          },
        ]}
        title="Create your account"
        buttonText="Sign up"
        onSubmit={onSubmit}
        isLoading={isLoading}
      />
    </>
  );
}
