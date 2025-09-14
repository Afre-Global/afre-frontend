import type React from "react";

import { AccountSidebar } from "@/components/account/account_sidebar";

export default function AccountLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen bg-gray-50">
      <AccountSidebar />
      <main className="flex-1 overflow-auto">{children}</main>
    </div>
  );
}
