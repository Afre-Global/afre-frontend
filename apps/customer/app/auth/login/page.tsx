"use client";

import { LoginForm } from "@repo/shared/validation/forms";

/**
 * Login page for the application.
 * Contains the login form and links for resetting password, go to sign-up page and go back to landing page.
 * The page should redirect to the landing page if user is already logged in.
 *
 * */
export default function LoginPage() {
  return <LoginForm />;
}
