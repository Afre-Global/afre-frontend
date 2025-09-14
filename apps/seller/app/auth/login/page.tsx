"use client";

import { LoginForm } from "@repo/shared/validation/forms";
import { SellerAppUrls } from "@repo/shared/utils/AppUrls";

/**
 * Login page for the application.
 * Contains the login form and links for resetting password, go to sign-up page and go back to landing page.
 * The page should redirect to the account page if user is already logged in.
 *
 * */
export default function LoginPage() {
  return <LoginForm app_urls={SellerAppUrls}/>;
}
