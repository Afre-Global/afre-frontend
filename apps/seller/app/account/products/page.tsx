import { ProductManagementPage } from "@/components/account/product_management_page";
import { get_user_access_token, getSellerProducts } from "@/lib/api_utils";

export default async function AccountPage() {
  const access_token = await get_user_access_token();
  const sellersProducts = await getSellerProducts(access_token);

  if (access_token) {
    return <ProductManagementPage access_token={access_token} sellersProducts={sellersProducts} />;
  }
}
