export const AppUrls = {
  emailVerification: "/email-verification",
  login: "/login",
  marketplace: "/marketplace",
  signup: "/signup",
  myAccount: "/my-account",
  product: (id: string) => `/product/${id}`,
  forgotPassword: "forgot-password",
} as const;
