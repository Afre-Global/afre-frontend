import { z } from "zod";

export const ForgotPasswordFormValSchema = z.object({
  email: z.string().email("Please provide a valid email address"),
});

export type ForgotPasswordFormValSchema = z.infer<typeof ForgotPasswordFormValSchema>;
