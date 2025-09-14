"use client";

import { SignUpForm } from "@repo/shared/validation/forms";
import { SellerAppUrls } from "@repo/shared/utils/AppUrls";

/**
 * Sign up page for the seller application.
 * This page displays the sign-up form for new sellers.
 */
export default function SignUpPage() {
  return <SignUpForm app_urls={SellerAppUrls} />;
}
