import { BaseError } from "./errors";

export class ConflictErr extends BaseError {
  statusCode: number = 409;
}
