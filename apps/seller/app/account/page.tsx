import { AccountGuard } from "@/components/account/account_guard";

export default function AccountPage() {
  return (
    <AccountGuard>
      <div className="flex h-screen bg-gray-50"></div>
    </AccountGuard>
  );
}
