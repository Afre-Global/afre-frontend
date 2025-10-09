"use client";

import { SignUpForm } from "@repo/shared/validation/forms";
import { CustomerAppUrls } from "@repo/shared/utils/AppUrls";

/**
 * Sign up page for the application.
 * Contains the login form and links for resetting password, go to sign-up page and go back to landing page.
 * The page should redirect to the landing page if user is already logged in.
 *
 * */
export default function SignUpPage() {
  return <SignUpForm app_urls={CustomerAppUrls} />;
}
