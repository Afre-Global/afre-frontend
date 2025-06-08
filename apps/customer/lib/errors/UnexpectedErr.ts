import { BaseError } from "./errors";

export class UnexpectedErr extends BaseError {
  constructor(params: { id: string; cause?: any }) {
    super({
      message: "An unexpected error occurred",
      cause: params.cause,
      id: params.id,
    });
  }
}
