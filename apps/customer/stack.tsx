import "server-only";

import { StackServerApp } from "@stackframe/stack";

export const stackServerApp = new StackServerApp({
  tokenStore: "nextjs-cookie",
  urls: {
    signIn: "auth/login",
    signUp: "auth/signup",
    afterSignIn: "/marketplace",
    afterSignUp: "auth/login",
    home: "/marketplace",
    afterSignOut: "/",
    passwordReset: "auth/reset-password",
    forgotPassword: "auth/forgot-password",
    emailVerification: "auth/email-verification",
  },
});
