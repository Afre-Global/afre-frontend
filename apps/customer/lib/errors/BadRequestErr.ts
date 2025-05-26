import { BaseError } from "./errors";

export class BadRequestErr extends BaseError {
  statusCode: number = 400;
}
