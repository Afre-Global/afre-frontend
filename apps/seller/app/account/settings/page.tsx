import { AccountGuard } from "@/components/account/account_guard";
import { AccountSettingsPage } from "@/components/account/account_settings_page";

export default function AccountPage() {
  return (
    <AccountGuard>
      <AccountSettingsPage />
    </AccountGuard>
  );
}
