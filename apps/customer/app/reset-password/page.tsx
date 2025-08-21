"use client";
import { ResetPasswordFormValSchema } from "@/lib/validation/forms/resetPassword";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth } from "@repo/shared/hooks";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  toast,
} from "@repo/shared/ui";
import { useSearchParams, useRouter } from "next/navigation";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

const LOGIN_URL = "/login";

export default function ResetPassword() {
  const resetPasswordForm = useForm<ResetPasswordFormValSchema>({
    resolver: zodResolver(ResetPasswordFormValSchema),
    defaultValues: {
      newPassword: "",
      confirmPassword: "",
    },
  });
  const { resetPassword } = useAuth();
  const [isLoading, setLoading] = useState(false);
  const searchParams = useSearchParams();
  const router = useRouter();

  const onSubmitForm: SubmitHandler<ResetPasswordFormValSchema> = async (data, event) => {
    event?.preventDefault();
    setLoading(true);
    const resetPasswordCode = searchParams.get("code");
    const result = await resetPassword(resetPasswordCode ?? "", data.newPassword);
    if (result.isErr()) {
      toast.error(result.getError()?.message, { position: "top-center" });
      setLoading(false);
      return;
    }

    toast.success("Password was successfully reset. You can now login with your new password", {
      position: "top-center",
    });
    setLoading(false);
    router.push(LOGIN_URL);
  };

  return (
    <div className="w-full min-h-screen flex">
      <div>
        <Form {...resetPasswordForm}>
          <form
            className="w-full space-y-8"
            onSubmit={resetPasswordForm.handleSubmit(onSubmitForm)}
          >
            <div className="space-y-4">
              {/* New Password */}
              <FormField
                control={resetPasswordForm.control}
                name="newPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>New Password</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="new password"
                        {...field}
                        className="w-full"
                        type="password"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Confirm Password */}
              <FormField
                control={resetPasswordForm.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm Password</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="confirm password"
                        {...field}
                        className="w-full"
                        type="password"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="space-y-4">
              <button
                disabled={isLoading}
                type="submit"
                className="w-full py-3 px-5 bg-green-700 text-white rounded-lg"
              >
                {isLoading ? "Loading..." : "Confirm"}
              </button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
