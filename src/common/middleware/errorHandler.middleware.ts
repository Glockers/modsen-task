import { NextFunction, Request, Response } from 'express';
import { AppError } from '../exceptions/AppError';

export function errorHandler(err: AppError, req: Request, res: Response, next: NextFunction) {
  err = !err.httpCode ? AppError.InternalServerError('Internal server error') : err;
  res.status(err.httpCode).json({
    status: err.httpCode,
    message: err.message
  });
}
