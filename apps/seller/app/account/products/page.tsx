import { ProductManagementPage } from "@/components/account/product_management_page";
import { stackServerApp } from "@/stack";

export default async function AccountPage() {
  const user = await stackServerApp.getUser();
  const token = await user.getAuthJson();

  return <ProductManagementPage access_token={token.accessToken} />;
}
