import { NextResponse, type NextRequest } from "next/server";
import { SellerAppUrls } from "@repo/shared/utils/AppUrls";
import { stackServerApp } from "./stack";
import { is_seller_onboarding_complete, get_user_access_token } from "@/lib/api_utils";

export async function middleware(request: NextRequest): Promise<NextResponse> {
  const user = await stackServerApp.getUser();
  const pathname = request.nextUrl.pathname;
  // Check if onboarding is complete
  const protectedRoutes = [SellerAppUrls.login, SellerAppUrls.signup, SellerAppUrls.forgotPassword];

  console.log("Got here");
  if (user && protectedRoutes.includes(pathname)) {
    return NextResponse.redirect(new URL(SellerAppUrls.myAccount, request.url));
  }

  console.log("Got here");
  const onboardingRoutes = [SellerAppUrls.onboarding];
  const accountRoutes = [SellerAppUrls.myAccount];
  const accountRoute = /^\/account\/([a-zA-Z0-9-_]+)$/;
  const access_token = await get_user_access_token();
  const is_onboarding_complete = await is_seller_onboarding_complete(access_token);
  if (user && onboardingRoutes.includes(pathname)) {
    if (is_onboarding_complete) {
      return NextResponse.redirect(new URL(SellerAppUrls.myAccount, request.url));
    }
  }
  // Check when going to account paths
  // if onboarding is incomplete send to onboarding
  if (user && (accountRoute.test(pathname) || accountRoutes.includes(pathname))) {
    if (!is_onboarding_complete) {
      return NextResponse.redirect(new URL(SellerAppUrls.onboarding, request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/auth/login",
    "/auth/signup",
    "/auth/forgot-password",
    "/account/:path*",
    "/onboarding",
  ],
};
