"server-only";
import axios from "axios";
import { BACKEND_URL } from "@repo/shared/utils/env";
import { stackServerApp } from "@/stack";
import { Product, Category, ListingType, UnitOfMeasure, CountryCode } from "@/lib/types";

export async function get_user_access_token() {
  const user = await stackServerApp.getUser();
  const token = await user.getAuthJson();
  const access_token = token.accessToken;
  console.log(access_token);
  return access_token;
}

export async function is_seller_onboarding_complete(access_token: string) {
  if (access_token) {
    const api = axios.create({
      baseURL: BACKEND_URL,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${access_token}`,
      },
    });
    const user_response = await api.get("/profiles/users/", {});
    const user_data = await user_response.data;
    const is_seller_onboarding_complete = await user_data.is_seller_onboarding_complete;
    return is_seller_onboarding_complete;
  }
  return false;
}

export async function getSellerProducts(access_token: string): Promise<Product[] | null> {
  const sellersProducts: Product[] = [];
  try {
    const api = axios.create({
      baseURL: BACKEND_URL,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${access_token}`,
      },
    });
    const response = await api.get("/seller/products/");
    response.data.forEach((product) => {
      const newProduct: Product = {
        id: product.id,
        name: product.name,
        description: product.description,
        unit_of_measure: product.unit_of_measure,
        category: Object.entries(Category).find(([key, val]) => val === product.category)[0],
        minimum_bid_price_per_unit: product.minimum_bid_price_per_unit,
        listing_type: product.listing_type,
        is_active: product.is_active,
        origin: Object.entries(CountryCode).find(([key, val]) => val === product.origin)[0],
        discount: product.discount,
        size: product.size,
        price_per_unit: product.price_per_unit,
        quantity_available: product.quantity_available,
      };
      sellersProducts.push(newProduct);
    });
    return sellersProducts;
  } catch (error) {
    console.error("Fetch failed", error);
    return null;
  }
}
