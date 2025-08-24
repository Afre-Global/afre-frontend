import { AccountGuard } from "@/components/account/account_guard";
import { AccountDashboard } from "@/components/account/account_dashboard";
import { AccountStats } from "@/components/account/account_stats";

export default function AccountPage() {
  return (
    <AccountGuard>
      <AccountStats />
      <AccountDashboard />
    </AccountGuard>
  );
}
