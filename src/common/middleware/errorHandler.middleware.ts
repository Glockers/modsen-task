import { NextFunction, Request, Response } from 'express';
import { AppError } from '../exceptions/AppError';
import { appConfig } from '../../config';

export function errorHandler(err: AppError, req: Request, res: Response, next: NextFunction) {
  err = !err.httpCode ? AppError.InternalServerError('Internal server error') : err;
  res.status(err.httpCode).json({
    status: err.httpCode,
    message: err.message,
    stack: appConfig.APP_NODE_ENV === 'debug' ? err.stack : undefined
  });
}
