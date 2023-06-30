import { NextFunction, Request, RequestHandler, Response } from 'express';
import { AppError } from '../exceptions/AppError';
import { Role } from '../types';
import { authService, extractAccessToken } from '../../auth';

export const hasRole = (permissions: Array<Role>): RequestHandler => {
  return (req: Request, res: Response, next: NextFunction): void => {
    const sessionUser = authService.verifyJWTToken(extractAccessToken(req), 'access');
    if (permissions.includes(sessionUser.role)) {
      next();
    } else {
      next(AppError.NoPermission());
    }
  };
};

export const checkAuth = (isAuth: boolean, errorMessage = 'Проблема с авторизацией') => {
  return (req: Request, res: Response, next: NextFunction) => {
    const sessionUser = authService.verifyJWTToken(extractAccessToken(req), 'access');
    if (sessionUser === null && !isAuth) {
      next();
    } else {
      next(AppError.ConflictError(errorMessage));
    }
  };
};
