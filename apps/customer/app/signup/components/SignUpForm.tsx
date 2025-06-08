import { SubmitHandler, useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
} from "@repo/shared/ui";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { SignUpFormValSchema } from "@/lib/validation/forms";

type SignUpFormProps = {};

export function SignUpForm({}: SignUpFormProps) {
  const signUpForm = useForm<SignUpFormValSchema>({
    resolver: zodResolver(SignUpFormValSchema),
  });

  const onSubmitForm: SubmitHandler<SignUpFormValSchema> = (data) => {
    // TODO: make login request with login information
    alert("hello");
  };

  return (
    <Form {...signUpForm}>
      <form
        className="w-full space-y-8"
        onSubmit={signUpForm.handleSubmit(onSubmitForm)}
      >
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

        {/* First Name */}
        <FormField
          control={signUpForm.control}
          name="firstName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>First Name</FormLabel>
              <FormControl>
                <Input placeholder="First Name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Last Name */}
        <FormField
          control={signUpForm.control}
          name="lastName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Last Name</FormLabel>
              <FormControl>
                <Input placeholder="Last Name" {...field} />
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
                <Input
                  placeholder="password"
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
            type="submit"
            className="w-full py-3 px-5 bg-green-700 text-white rounded-lg"
          >
            Sign Up
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
