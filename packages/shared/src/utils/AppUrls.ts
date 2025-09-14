export interface AppUrlsInterface {
  emailVerification: string;
  login: string;
  marketplace?: string; // This property is optional
  signup: string;
  myAccount: string; // This property is optional
  product?: (id: string) => string; // This property is optional
  forgotPassword: string;
}

export const CustomerAppUrls: AppUrlsInterface = {
  emailVerification: "auth/email-verification",
  login: "auth/login",
  marketplace: "/marketplace",
  signup: "auth/signup",
  myAccount: "/my-account",
  product: (id: string) => `/product/${id}`,
  forgotPassword: "auth/forgot-password",
} as const;

export const SellerAppUrls: AppUrlsInterface = {
  emailVerification: "auth/email-verification",
  login: "auth/login",
  signup: "auth/signup",
  myAccount: "/account",
  forgotPassword: "auth/forgot-password",
} as const;
