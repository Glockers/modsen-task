import { NextFunction, Request, RequestHandler, Response } from 'express';
import { AppError } from '../exceptions/AppError';
import { Role } from '../interfaces';
import { cookieExtractorAccessToken, validateJWTToken } from '../../authentication';

export const hasRole = (permissions: Array<Role>): RequestHandler => {
  return (req: Request, res: Response, next: NextFunction): void => {
    const sessionUser = validateJWTToken(cookieExtractorAccessToken(req), 'access');
    if (permissions.includes(sessionUser.role)) {
      next();
    } else {
      next(AppError.NoPermission());
    }
  };
};
export const checkAuth = (isAuth: boolean, errorMessage = 'Проблема с авторизацией') => {
  return (req: Request, res: Response, next: NextFunction) => {
    const sessionUser = validateJWTToken(cookieExtractorAccessToken(req), 'access');
    if (sessionUser === null && !isAuth) {
      next();
    } else {
      next(AppError.ConflictError(errorMessage));
    }
  };
};
