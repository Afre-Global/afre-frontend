export class ErrorOr<T> {
  public readonly value?: T;
  public readonly error?: Error;

  private constructor(value?: T, error?: Error) {
    this.value = value;
    this.error = error;
  }
  static ok<T>(value: T): ErrorOr<T> {
    return new ErrorOr(value);
  }

  static err<T = never>(error: Error | string): ErrorOr<T> {
    return new ErrorOr<T>(
      undefined,
      typeof error === "string" ? new Error(error) : error,
    );
  }

  isOk(): this is { value: T } & ErrorOr<T> {
    return this.error === undefined;
  }
  isErr(): this is { error: Error } & ErrorOr<T> {
    return this.error !== undefined;
  }

  unwrap(): T {
    if (this.isErr()) {
      throw this.error;
    }
    return this.value as T;
  }

  unwrapOr(defaultValue: T): T {
    return this.isOk() ? (this.value as T) : defaultValue;
  }

  getError(): Error | undefined {
    return this.error;
  }
}
