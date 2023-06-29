import { httpStatus } from '../types';

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
    return new AppError(httpStatus.BAD_REQUEST, message);
  }

  static Unauthorized(message = 'User is not authorized') {
    return new AppError(httpStatus.UNAUTHORIZED, message);
  }

  static NoPermission() {
    return new AppError(httpStatus.FORBIDDEN, 'User does not have access!');
  }

  static NotFound(message: string) {
    return new AppError(httpStatus.NOT_FOUND, message);
  }

  static InternalServerError(message: string) {
    return new AppError(httpStatus.INTERNAL_SERVER_ERROR, message);
  }

  static ConflictError(message: string) {
    return new AppError(httpStatus.CONFLICT, message);
  }
}
