import { ReusableForm } from "./Form";
import { z } from "zod";
import { SignInFormValidation } from "@/lib/validation";
import { getUser } from "@/lib/actions/user.actions";
import { useRouter } from "next/navigation";
import { DialogPopUp } from "../DialogPopUp";
import { useState } from "react";

export default function SignInForm() {
  const router = useRouter();
  const [isBlocked, setIsBlocked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [incorrectPassword, setIncorrectPassword] = useState(false);

  async function onSubmit({
    email,
    password,
  }: z.infer<typeof SignInFormValidation>) {
    setIsLoading(true);
    setIsBlocked(false);

    try {
      const session = await getUser(email, password);
      if ("error" in session!) {
        if (session.error === "User is blocked") {
          setIsBlocked(true);
        } else if (session.error === 401) {
          setIncorrectPassword(true);
        } else {
          console.error(session.error);
        }
      } else {
        router.push(`/dashboard`);
      }
    } catch (error) {
      console.error(error);
    }
    setIsLoading(false);
  }

  return (
    <>
      {isBlocked && (
        <DialogPopUp
          messageTitle="Account Blocked"
          messageContent="We’ve detected a restriction on your account. Please contact an administrator for further details and support."
        />
      )}

      {incorrectPassword && (
        <DialogPopUp
          messageTitle="Incorrect Password"
          messageContent="The password you entered is incorrect. Please try again."
        />
      )}

      <ReusableForm
        schema={SignInFormValidation}
        defaultValues={{ email: "", password: "" }}
        fields={[
          {
            name: "email",
            label: "Login",
            placeholder: "Email or phone number",
            type: "email",
          },
          {
            name: "password",
            label: "Password",
            placeholder: "Enter password",
            type: "password",
          },
        ]}
        title="Nice to see you again"
        buttonText="Sign in"
        onSubmit={onSubmit}
        isLoading={isLoading}
      />
    </>
  );
}
