import { BaseError } from "./errors";

export class UnexpectedErr extends BaseError {
  constructor(params: { id: string }) {
    super({
      message: "An unexpected error occurred",
      id: params.id,
    });
  }
}
