import { z } from "zod";

export const LoginFormValSchema = z.object({
  email: z.string().email("Please provide a valid email address"),
  password: z.string(),
});

export type LoginFormValSchema = z.infer<typeof LoginFormValSchema>;
