import { NextResponse, type NextRequest } from "next/server";
import { SellerAppUrls } from "@repo/shared/utils/AppUrls";
import { stackServerApp } from "./stack";

export async function middleware(request: NextRequest): Promise<NextResponse> {
  const user = await stackServerApp.getUser();

  const protectedRoutes = [SellerAppUrls.login, SellerAppUrls.signup, SellerAppUrls.forgotPassword];

  if (user && protectedRoutes.includes(request.nextUrl.pathname)) {
    return NextResponse.redirect(new URL(SellerAppUrls.myAccount, request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [SellerAppUrls.login, SellerAppUrls.signup, SellerAppUrls.forgotPassword],
};
