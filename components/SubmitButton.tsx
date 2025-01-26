import React from "react";
import { Button } from "./ui/button";
import { SubmitButtonProps } from "@/types";
import { useToast } from "@/hooks/use-toast";
import Image from "next/image";
import { ToastAction, ToastActionElement } from "./ui/toast";

const SubmitButton = ({
  buttonText,
  isLoading,
  onClick,
  className,
  disabled,
  toastProps,
}: SubmitButtonProps) => {
  const { toast } = useToast();

  return (
    <Button
      type="submit"
      disabled={disabled || isLoading}
      className={className}
      onClick={() => {
        if (disabled || isLoading) return;
        onClick!();
        if (toastProps) {
          toast({
            title: toastProps!.title,
            description: toastProps!.description,
            action: <ToastAction altText="Close action">Close</ToastAction>,
          });
        }
      }}
    >
      {isLoading ? (
        <div className="flex items-center gap-4">
          <Image
            src="/icons/loader.svg"
            alt="Loader"
            width={20}
            height={20}
            className="animate-spin"
          />
          Loading...
        </div>
      ) : (
        buttonText
      )}
    </Button>
  );
};

export default SubmitButton;
