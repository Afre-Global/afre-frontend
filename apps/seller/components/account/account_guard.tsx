"use client";

import type React from "react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

interface AccountGuardProps {
  children: React.ReactNode;
}

export function AccountGuard({ children }: AccountGuardProps) {
  const user = {};
  const isSeller = true;
  const isLoading = false;
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && (!user || !isSeller)) {
      router.push("/account/login")
    }
  }, [user, isSeller, isLoading, router])

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-green-600"></div>
      </div>
    )
  }

  if (!user || !isSeller) {
    return null
  }

  return <>{children}</>;
}
