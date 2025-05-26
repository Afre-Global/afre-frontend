import { BaseError } from "./errors";

export class NotfoundErr extends BaseError {
  statusCode: number = 404;
}
