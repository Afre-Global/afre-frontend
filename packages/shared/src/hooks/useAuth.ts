"use client";
import { useStackApp, useUser } from "@stackframe/stack";
import { ErrorOr } from "../utils/errors";

const UNEXPECTED_ERROR_MSG = "An unexpected error occurred. Please try again later.";

type CustomerSignUp = {
  email: string;
  password: string;
  emailVerificationUrl?: string;
};

type AppUser = {
  email?: string | null;
  isEmailVerified?: boolean | null;
  name?: string | null;
  signOut?: (redirectUrl?: string | URL) => Promise<void>;
  isLoggedIn: boolean;
  userType?: AppUserType;
  getUserType: () => Promise<AppUserType>;
  deleteAccount: () => Promise<ErrorOr<undefined>>;
};

enum AppUserType {
  Customer,
  Seller,
  Both,
}

type UseAuthParams = {
  needsToBeLoggedIn?: boolean;
};

type UseAuth = {
  signUpUser: (params: CustomerSignUp) => Promise<ErrorOr<undefined>>;
  signInWithEmailAndPassword: (email: string, password: string) => Promise<ErrorOr<undefined>>;
  emailVerification: (code: string) => Promise<ErrorOr<undefined>>;
  sendForgotPasswordEmail: (email: string, redirectUrl?: string) => Promise<ErrorOr<undefined>>;
  resetPassword: (code: string, newPassword: string) => Promise<ErrorOr<undefined>>;
  verifyPasswordResetCode: (code: string) => Promise<ErrorOr<undefined>>;
  user: AppUser;
};

/**
 * Shared authentication hook for both customer and seller with basic authenticaton
 * functions and data for handling users. Interface for underlying thirdparty authentication
 * library.
 */
export function useAuth({ needsToBeLoggedIn = false }: UseAuthParams = {}): UseAuth {
  const app = useStackApp(); // do not destructure useStackApp. Causes undefined property issues.
  const stackUser = useUser(needsToBeLoggedIn ? { or: "redirect" } : undefined);

  /**
   * Signs in user with email and password. User's type (whether customer or seller) can not be
   * determine during sign in. Must use user.getUserType() in order to differentiate between
   * a customer and a seller.
   */
  const signInWithEmailAndPassword = async (
    email: string,
    password: string,
    redirect?: boolean,
  ): Promise<ErrorOr<undefined>> => {
    try {
      const result = await app.signInWithCredential({
        email,
        password,
        noRedirect: !!redirect,
      });
      if (result.status === "error") {
        switch (result.error.errorCode) {
          case "EMAIL_PASSWORD_MISMATCH":
            return ErrorOr.err("Wrong email or password");
          case "INVALID_TOTP_CODE":
            return ErrorOr.err("Invalid TOTP code. Please try again.");
          default:
            return ErrorOr.err(UNEXPECTED_ERROR_MSG);
        }
      }
    } catch (e) {
      console.error(`${UNEXPECTED_ERROR_MSG}: ${e}`);
      return ErrorOr.err(UNEXPECTED_ERROR_MSG);
    }

    return ErrorOr.ok(undefined);
  };

  /**
   * Signs up user. No extra information other than email and password can be passed
   * so onboarding is essential after sign up.
   */
  const signUpUser = async (params: CustomerSignUp): Promise<ErrorOr<undefined>> => {
    try {
      const result = await app.signUpWithCredential({
        email: params.email,
        password: params.password,
        verificationCallbackUrl: params.emailVerificationUrl,
      });

      if (result.status === "error") {
        switch (result.error.errorCode) {
          case "USER_EMAIL_ALREADY_EXISTS":
            return ErrorOr.err(`User with email ${params.email} already exists.  `);
          case "PASSWORD_REQUIREMENTS_NOT_MET":
            return ErrorOr.err(`${result.error.humanReadableMessage}`);
          default:
            return ErrorOr.err(UNEXPECTED_ERROR_MSG);
        }
      }
    } catch (e) {
      console.error(`${UNEXPECTED_ERROR_MSG}: ${e}`);
      return ErrorOr.err(UNEXPECTED_ERROR_MSG);
    }

    return ErrorOr.ok(undefined);
  };

  /**
   * Verifies email verification code that is part of the email verification
   * url sent to users after sign up.
   */
  const emailVerification = async (code: string): Promise<ErrorOr<undefined>> => {
    try {
      const result = await app.verifyEmail(code);
      if (result.status === "error") {
        return ErrorOr.err(result.error.humanReadableMessage);
      }
    } catch (e) {
      console.error(`${UNEXPECTED_ERROR_MSG}: ${e}`);
      return ErrorOr.err(UNEXPECTED_ERROR_MSG);
    }

    return ErrorOr.ok(undefined);
  };

  /**
   * Sends forgot password email to the user's email address.
   * @param redirectUrl - url sent to the user's email to reset their password. Note if used but be an absolute PATH url (e.g https://our-domain.com/reset-password)
   */
  const sendForgotPasswordEmail = async (
    email: string,
    redirectUrl?: string,
  ): Promise<ErrorOr<undefined>> => {
    try {
      const result = await app.sendForgotPasswordEmail(email, { callbackUrl: redirectUrl });

      if (result.status === "error") {
        switch (result.error.errorCode) {
          case "USER_NOT_FOUND":
            return ErrorOr.err(result.error.humanReadableMessage);
          default:
            return ErrorOr.err(UNEXPECTED_ERROR_MSG);
        }
      }
    } catch (e) {
      console.error(`${UNEXPECTED_ERROR_MSG}: ${e}`);
      return ErrorOr.err(UNEXPECTED_ERROR_MSG);
    }

    return ErrorOr.ok(undefined);
  };

  /**
   * Resets users password. Requires the code sent to their email.
   */
  const resetPassword = async (code: string, newPassword: string): Promise<ErrorOr<undefined>> => {
    try {
      const result = await app.resetPassword({ code, password: newPassword });
      if (result.status == "error") {
        return ErrorOr.err(result.error.humanReadableMessage);
      }
    } catch (e) {
      console.error(`${UNEXPECTED_ERROR_MSG}: ${e}`);
      return ErrorOr.err(UNEXPECTED_ERROR_MSG);
    }
    return ErrorOr.ok(undefined);
  };

  /**
   * Verifies whether the password reset code inputed by the user is valid.
   */
  const verifyPasswordResetCode = async (code: string): Promise<ErrorOr<undefined>> => {
    try {
      const result = await app.verifyPasswordResetCode(code);
      if (result.status == "error") {
        return ErrorOr.err(result.error.humanReadableMessage);
      }
    } catch (e) {
      console.error(`${UNEXPECTED_ERROR_MSG}: ${e}`);
      return ErrorOr.err(UNEXPECTED_ERROR_MSG);
    }
    return ErrorOr.ok(undefined);
  };

  const user: AppUser = {
    email: stackUser?.primaryEmail,
    name: stackUser?.displayName,
    isEmailVerified: stackUser?.primaryEmailVerified,
    isLoggedIn: stackUser ? true : false,
    signOut: async (redirectUrl) => await stackUser?.signOut({ redirectUrl }),
    userType: undefined,
    async getUserType(): Promise<AppUserType> {
      if (this.userType) {
        return this.userType;
      }
      await Promise.resolve();
      this.userType = AppUserType.Customer;
      return this.userType;
    },
    async deleteAccount() {
      try {
        await stackUser?.delete();
      } catch (e) {
        console.error(`${UNEXPECTED_ERROR_MSG}: ${e}`);
        return ErrorOr.err(UNEXPECTED_ERROR_MSG);
      }
      return ErrorOr.ok(undefined);
    },
  };

  return {
    signInWithEmailAndPassword,
    signUpUser,
    emailVerification,
    sendForgotPasswordEmail,
    resetPassword,
    verifyPasswordResetCode,
    user,
  };
}
