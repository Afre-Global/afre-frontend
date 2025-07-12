import { z } from "zod";

export const SignUpFormValSchema = z
  .object({
    email: z.string().email("Please provide a valid email address"),
    password: z.string().min(8),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type SignUpFormValSchema = z.infer<typeof SignUpFormValSchema>;
