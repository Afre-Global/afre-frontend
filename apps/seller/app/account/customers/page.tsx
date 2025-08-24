import { AccountGuard } from "@/components/account/account_guard";
import { CustomerManagementPage } from "@/components/account/customer_management_page";

export default function AccountPage() {
  return (
    <AccountGuard>
      <CustomerManagementPage />
    </AccountGuard>
  );
}
