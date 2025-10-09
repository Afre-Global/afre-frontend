"use client";
import { useAuth } from "@repo/shared/hooks";
import { Button, toast } from "@repo/shared/ui";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { SellerAppUrls } from "@repo/shared/utils/AppUrls";

const CODE_PARAM = "code";

export default function EmailVerification() {
  const { emailVerification, user } = useAuth();
  const searchParams = useSearchParams();
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const onClick = async () => {
    const emailVerificationCode = searchParams.get(CODE_PARAM);
    const result = await emailVerification(emailVerificationCode ?? "");

    if (result.isErr()) {
      toast.error(result.error.message, { position: "top-center" });
      return;
    }
    setIsEmailVerified(true);
  };

  return (
    <div className="w-full min-h-screen flex justify-center items-center">
      {isEmailVerified ? (
        <div className="items-center space-y-20">
          <h3 className="text-center">
            Thank you for verifying your account! Please proceed to login.
          </h3>
          <Button asChild>
            <Link href={SellerAppUrls.login}>Login</Link>
          </Button>
        </div>
      ) : (
        <div className="flex flex-col justify-center space-y-10">
          <h3 className="text-center">Please click on the button to verify your account</h3>
          <Button onClick={onClick} className="bg-green-700 hover:bg-[#075b23]">
            Verify Email
          </Button>
        </div>
      )}
    </div>
  );
}
