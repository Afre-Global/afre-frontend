import { AccountGuard } from "@/components/account/account_guard";
import { FutureProductManagementPage } from "@/components/account/future_product_management_page";

export default function AccountPage() {
  return (
    <AccountGuard>
      <FutureProductManagementPage />
    </AccountGuard>
  );
}
