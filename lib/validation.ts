"use client";

import { z } from "zod";

export const SignInFormValidation = z.object({
  email: z
    .string()
    .min(2, { message: "Name must be at least 2 characters long." })
    .max(50, { message: "Name cannot exceed 50 characters." }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long." })
    .max(50, { message: "Password cannot exceed 50 characters." }),
});

export const SignUpFormValidation = z
  .object({
    name: z
      .string()
      .min(2, { message: "Name must be at least 2 characters long." })
      .max(50, { message: "Name cannot exceed 50 characters." }),
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters long." })
      .max(50, { message: "Password cannot exceed 50 characters." }),
    email: z.string().email({ message: "Please enter a valid email address." }),
    confirmPassword: z
      .string()
      .min(8, {
        message: "Password confirmation must be at least 8 characters long.",
      })
      .max(50, {
        message: "Password confirmation cannot exceed 50 characters.",
      }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match.",
    path: ["confirmPassword"],
  });
