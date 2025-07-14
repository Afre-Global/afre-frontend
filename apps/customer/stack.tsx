import "server-only";

import { StackServerApp } from "@stackframe/stack";

export const stackServerApp = new StackServerApp({
  tokenStore: "nextjs-cookie",
  urls: {
    signIn: "/login",
    signUp: "/signup",
    afterSignIn: "/marketplace",
    afterSignUp: "/login",
    home: "/marketplace",
    afterSignOut: "/",
    passwordReset: "/reset-password",
    forgotPassword: "/forgot-password",
    emailVerification: "/email-verification",
  },
});
