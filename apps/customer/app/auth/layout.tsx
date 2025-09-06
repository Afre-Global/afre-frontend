"use client";

import { ShoppingBag } from "lucide-react";
import Image from "next/image";

import { BUYER_PLATFORM_URL } from "@repo/shared/utils/env";

export default function LoginPage({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-start">
          <a href={BUYER_PLATFORM_URL} className="flex items-center gap-2 font-medium">
            <div className="flex items-center gap-2 font-bold text-xl">
              <ShoppingBag className="h-6 w-6 text-[#075b23]" />
            </div>
            <span className="text-[#075b23]">Afre</span>
          </a>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">{children}</div>
        </div>
      </div>
      <div className="bg-muted relative hidden lg:block">
        <Image
          fill
          src={"/login_pic1.png"}
          alt="login_image"
          className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>
    </div>
  );
}
