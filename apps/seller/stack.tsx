import "server-only";

import { StackServerApp } from "@stackframe/stack";

export const stackServerApp = new StackServerApp({
  tokenStore: "nextjs-cookie",
  urls: {
    signIn: "auth/login",
    signUp: "auth/signup",
    afterSignIn: "/account",
    afterSignUp: "auth/login",
    home: "/account",
    afterSignOut: "/",
    passwordReset: "/reset-password",
    forgotPassword: "/forgot-password",
    emailVerification: "/email-verification",
  },
});
