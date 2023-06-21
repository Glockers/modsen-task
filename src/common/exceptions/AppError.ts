export class AppError extends Error {
  public readonly httpCode: number;
  public readonly message: string;

  constructor(httpCode, message) {
    super(message);

    Object.setPrototypeOf(this, new.target.prototype);

    this.httpCode = httpCode;
    this.message = message;

    Error.captureStackTrace(this);
  }

  static BadRequest(message: string) {
    return new AppError(400, message);
  }

  static Unauthorized() {
    return new AppError(401, 'User is not authorized');
  }

  static NoPermission() {
    return new AppError(403, 'User does not have access!');
  }

  static NotFound(message: string) {
    return new AppError(404, message);
  }

  static InternalServerError(message: string) {
    return new AppError(500, message);
  }

  static ConflictError(message: string) {
    return new AppError(409, message);
  }
}
