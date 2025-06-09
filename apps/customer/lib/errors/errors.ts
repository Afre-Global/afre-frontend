export class BaseError extends Error {
  message: string;
  id: string;
  statusCode: number = 500;
  constructor(params: { message: string; id: string; statusCode?: number }) {
    super(params.message);
    this.message = params.message;
    this.id = params.id;

    if (params.statusCode) {
      this.statusCode = params.statusCode;
    }
  }
}
