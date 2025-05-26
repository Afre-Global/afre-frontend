import { BaseError } from "./errors";

export class AuthErr extends BaseError {
  statusCode = 401;
}
