import { z } from "zod";

export const SignUpFormValSchema = z.object({
  email: z.string().email("Please provide a valid email address"),
  firstName: z.string().min(2),
  lastName: z.string().min(2),
  password: z.string().min(8),
  confirmPassword: z.string(),
});

export type SignUpFormValSchema = z.infer<typeof SignUpFormValSchema>;
