import { AccountGuard } from "@/components/account/account_guard";
import { OrderManagementPage } from "@/components/account/order_management_page";

export default function AccountPage() {
  return (
    <AccountGuard>
      <OrderManagementPage />
    </AccountGuard>
  );
}
