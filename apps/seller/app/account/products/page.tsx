import { AccountGuard } from "@/components/account/account_guard";
import { ProductManagementPage } from "@/components/account/product_management_page";

export default function AccountPage() {
  return (
    <AccountGuard>
      <ProductManagementPage />
    </AccountGuard>
  );
}
