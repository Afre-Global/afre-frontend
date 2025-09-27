"server-only";
import axios from "axios";
import { BACKEND_URL } from "@repo/shared/utils/env";
import { stackServerApp } from "@/stack";

export async function get_user_access_token() {
  const user = await stackServerApp.getUser();
  const token = await user.getAuthJson();
  const access_token = token.accessToken;
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
    console.log(user_data);
    const is_seller_onboarding_complete = await user_data.is_seller_onboarding_complete;
    return is_seller_onboarding_complete;
  }
  return false;
}
