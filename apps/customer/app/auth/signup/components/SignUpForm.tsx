import { SubmitHandler, useForm } from "react-hook-form";
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
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { SignUpFormValSchema } from "@/lib/validation/forms";
import { useAuth } from "@repo/shared/hooks";
import React from "react";
import { useRouter } from "next/navigation";
import { AppUrls } from "@/lib/constants/appurls";

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
type SignUpFormProps = {};

export function SignUpForm(_: SignUpFormProps) {
  const signUpForm = useForm<SignUpFormValSchema>({
    resolver: zodResolver(SignUpFormValSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
  });
  const { signUpUser } = useAuth();
  const [isLoading, setLoading] = React.useState(false);
  const router = useRouter();

  const onSubmitForm: SubmitHandler<SignUpFormValSchema> = async (data) => {
    setLoading(true);
    const result = await signUpUser({ email: data.email, password: data.password });
    if (result.isErr()) {
      toast.error(result.getError()?.message, { position: "top-center" });
    } else {
      toast.success("Sign up successful. Please check your email for verification", {
        position: "top-center",
      });
    }
    setLoading(false);
    router.push(AppUrls.login);
  };

  return (
    <Form {...signUpForm}>
      <form className="w-full space-y-8" onSubmit={signUpForm.handleSubmit(onSubmitForm)}>
        <div className="space-y-4">
          {/* Email */}
          <FormField
            control={signUpForm.control}
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
          <FormField
            control={signUpForm.control}
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

          {/* Confirm Password */}
          <FormField
            control={signUpForm.control}
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
            {isLoading ? "Loading..." : "Sign Up"}
          </button>
          <p className="text-sm w-full text-center">
            Already have an account?{" "}
            <Link href={"/login"} className="hover:underline text-sm">
              Log in
            </Link>
          </p>
        </div>
      </form>
    </Form>
  );
}
