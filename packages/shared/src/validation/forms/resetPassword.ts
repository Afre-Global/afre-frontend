import { z } from "zod";

export const ResetPasswordFormValSchema = z
  .object({
    newPassword: z.string().min(8),
    confirmPassword: z.string(),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type ResetPasswordFormValSchema = z.infer<typeof ResetPasswordFormValSchema>;
