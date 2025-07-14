"use client";
import { ForgotPasswordFormValSchema } from "@/lib/validation/forms";
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

export default function ForgotPassword() {
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
    }

    toast.success("Reset Password Link has been sent!", { position: "top-center" });
    setIsLoading(true);
  };

  return (
    <div className="w-full min-h-screen flex items-center px-10 ">
      <div className="flex flex-col">
        <h2 className="text-3xl mb-5">Forgot Password?</h2>
        <h4>Please input your email and an email will be sent to reset your password.</h4>

        <Form {...forgotPasswordForm}>
          <form onSubmit={forgotPasswordForm.handleSubmit(onSubmit)}>
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
            <Button disabled={isLoading} className="mt-10">
              {isLoading ? "Loading..." : "Submit"}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
