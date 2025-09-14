"use client";

import { SellerAppUrls } from "@repo/shared/utils/AppUrls";
import { useAuth } from "@repo/shared/hooks";
import { useRouter } from "next/navigation";

export default function VerficationWarning() {
  const { user } = useAuth({ needsToBeLoggedIn: true });
  const router = useRouter();

  if (user.isLoggedIn && user.isEmailVerified) {
    router.push(SellerAppUrls.myAccount);
  }

  return (
    <div className="w-full min-h-screen flex justify-center items-center px-10">
      <h2 className="font-bold w-96 text-center">
        Your account is not verified. Please check your email for our verification link.
      </h2>
    </div>
  );
}
