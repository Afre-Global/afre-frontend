"use client";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import {
  Button,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  toast,
} from "@repo/shared/ui";
import Link from "next/link";
import { LoginFormValSchema } from "@repo/shared/validation/forms";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth } from "@repo/shared/hooks";

/* eslint-disable @typescript-eslint/no-empty-object-type */
type LoginFormProps = {};
/* eslint-enable @typescript-eslint/no-empty-object-type */
export function LoginForm(_: LoginFormProps) {
  const { signInWithEmailAndPassword } = useAuth();
  const [loading, setLoading] = React.useState(false);
  const loginForm = useForm<LoginFormValSchema>({
    resolver: zodResolver(LoginFormValSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmitForm: SubmitHandler<LoginFormValSchema> = async (data, event) => {
    event?.preventDefault();
    setLoading(true);
    const result = await signInWithEmailAndPassword(data.email, data.password);
    if (result.isErr()) {
      toast.error(result.getError()?.message, { position: "top-center" });
    }
    setLoading(false);
  };

  return (
    <Form {...loginForm}>
      <form className="flex flex-col gap-6" onSubmit={loginForm.handleSubmit(onSubmitForm)}>
        <div className="flex flex-col items-center gap-2 text-center">
          <h1 className="text-2xl font-bold">Login to your account</h1>
          <p className="text-muted-foreground text-sm text-balance">
            Enter your email below to login to your account
          </p>
        </div>
        <div className="space-y-4">
          {/* Email */}
          <FormField
            control={loginForm.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="Email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Password */}
          <div className="space-y-4">
            <FormField
              control={loginForm.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input placeholder="password" {...field} className="w-full" type="password" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Link href={"auth/forgot-password"} className="hover:underline text-xs">
              Forgot Password?
            </Link>
          </div>
        </div>
        <div className="space-y-4">
          <Button
            type="submit"
            className="w-full py-3 px-5 bg-green-700 text-white rounded-lg"
            disabled={loading}
          >
            {loading ? "Loading..." : "Login"}
          </Button>
          <p className="text-sm w-full text-center">
            Don&apos;t have an account?{" "}
            <Link href={"/auth/signup"} className="hover:underline text-sm">
              Sign Up
            </Link>
          </p>
        </div>
      </form>
    </Form>
  );
}
