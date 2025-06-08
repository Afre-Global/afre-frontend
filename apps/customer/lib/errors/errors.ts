export class BaseError extends Error {
  message: string;
  id: string;
  cause?: any;
  statusCode: number = 500;
  constructor(params: {
    message: string;
    id: string;
    cause?: any;
    statusCode?: number;
  }) {
    super();
    this.message = params.message;
    this.id = params.id;
    this.cause = params.cause;

    if (params.statusCode) {
      this.statusCode = params.statusCode;
    }
  }
}
