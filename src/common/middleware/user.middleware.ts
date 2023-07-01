import { NextFunction, Request, RequestHandler, Response } from 'express';
import { AppError } from '../exceptions/AppError';
import { Role } from '../types';
import { authService, extractTokenFromCookies } from '../../auth';
import { JwtStrategyType } from '../types/strategy.enum';

export const hasRole = (permissions: Array<Role>): RequestHandler => {
  return (req: Request, res: Response, next: NextFunction): void => {
    const sessionUser = authService.verifyJWTToken(extractTokenFromCookies(req, JwtStrategyType.ACCESS_JWT_STRATEGY), 'access');
    if (permissions.includes(sessionUser.role)) {
      next();
    } else {
      next(AppError.NoPermission());
    }
  };
};

export const checkAuth = (isAuth: boolean, errorMessage = 'Проблема с авторизацией') => {
  return (req: Request, res: Response, next: NextFunction) => {
    const sessionUser = authService.verifyJWTToken(extractTokenFromCookies(req, JwtStrategyType.ACCESS_JWT_STRATEGY), 'access');
    if (sessionUser === null && !isAuth) {
      next();
    } else {
      next(AppError.ConflictError(errorMessage));
    }
  };
};
