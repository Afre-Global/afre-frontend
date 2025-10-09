"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth } from "@repo/shared/hooks";
import {
  Button,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  Form,
  toast,
} from "@repo/shared/ui";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";

export const ForgotPasswordFormValSchema = z.object({
  email: z.string().email("Please provide a valid email address"),
});

export type ForgotPasswordFormValSchema = z.infer<typeof ForgotPasswordFormValSchema>;

export function ForgotPasswordForm() {
  const { sendForgotPasswordEmail } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const forgotPasswordForm = useForm<ForgotPasswordFormValSchema>({
    resolver: zodResolver(ForgotPasswordFormValSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit: SubmitHandler<ForgotPasswordFormValSchema> = async (data, event) => {
    event?.preventDefault();
    setIsLoading(true);
    const result = await sendForgotPasswordEmail(data.email);

    if (result.isErr()) {
      toast.error(result.getError()?.message, { position: "top-center" });
      setIsLoading(false);
      return;
    }

    setIsLoading(false);
    toast.success("Reset Password Link has been sent!", { position: "top-center" });
  };

  return (
    <Form {...forgotPasswordForm}>
      <form onSubmit={forgotPasswordForm.handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-2 items-center text-center">
          <h1 className="text-2xl font-bold">Forgot Password?</h1>
          <p className="text-muted-foreground text-sm text-balance">
            Please input your email and an email will be sent to reset your password.
          </p>
        </div>
        <div className="space-y-4">
          <FormField
            control={forgotPasswordForm.control}
            name="email"
            render={({ field }) => (
              <FormItem className="space-y-2 mt-10">
                <FormLabel>Email </FormLabel>
                <FormControl>
                  <Input className="" placeholder="example@gmail.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="space-y-4">
          <Button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 px-5 bg-green-700 text-white rounded-lg hover:bg-[#075b23]"
          >
            {isLoading ? "Loading..." : "Submit"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
