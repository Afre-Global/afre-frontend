import { AuthErr, BaseError, UnexpectedErr } from "../errors";
import { JWT } from "next-auth/jwt";

/**
 * makes request to the backend for login
 * throw { AuthErr } for invalid credentials
 * throws { UnexpectedErr } for internal server errors or unexpected errors
 * */
export async function login(
  email: string,
  password: string,
  backendUrl: string,
): Promise<LoginUserResponse> {
  try {
    const res = await fetch(backendUrl, {
      method: "POST",
      body: JSON.stringify({
        email: email,
        password: password,
      }),
      headers: { "Content-Type": "application/json" },
    });

    const user = await res.json();
    if (res.status === 401) {
      throw new AuthErr({
        id: "INVALID_CREDENTIALS",
        message: "Invalid Email or Password",
      });
    }
    if (!res.ok && !user) {
      throw new UnexpectedErr({ id: "UNEXPECTED_LOGIN_LOGIN_ERR" });
    }

    if (user["tokens"] && typeof user["tokens"] === "string") {
      user["tokens"] = user["tokens"].replaceAll("'", '"');
      user["tokens"] = JSON.parse(user["tokens"]);
    }
    return user as LoginUserResponse;
  } catch (err) {
    if (err instanceof BaseError) {
      throw err;
    } else {
      console.log(err);
      throw new UnexpectedErr({ id: "UNEXPECTED_LOGIN_ERR" });
    }
  }
}
/**
 * Takes a token, and returns a new token with updated
 * `accessToken` and `accessTokenExpires`. If an error occurs,
 * returns the old token and an error property
 */
export async function refreshAccessToken(backendUrl: string, refreshToken: string) {
  try {
    const response = await fetch(backendUrl, {
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        refresh: refreshToken,
      }),
      method: "POST",
    });

    const refreshedTokens = await response.json();

    if (refreshedTokens.status == 401) {
      throw new AuthErr({
        id: "INVALID_REFRESH_TOKEN",
        message: "Invalid Refresh Token",
      });
    }

    if (!response.ok) {
      throw new UnexpectedErr({ id: "UNEXPECTED_REFRESH_TOKEN_RESPONSE_ERR" });
    }

    return refreshedTokens as RefreshAccessTokenResponse;
  } catch (error) {
    console.log(error);
    if (error instanceof BaseError) {
      throw error;
    } else {
      throw new UnexpectedErr({ id: "UNEXPECTED_REFRESH_TOKEN_ERR" });
    }
  }
}

type LoginUserResponse = {
  email: string;
  username: string;
  tokens: {
    refresh: string;
    access: string;
    refresh_expire_time: string;
    access_expire_time: string;
  };
};

type RefreshAccessTokenResponse = {
  access: string;
  access_expire_time: string;
  refresh: string;
  refresh_expire_time: string;
};
