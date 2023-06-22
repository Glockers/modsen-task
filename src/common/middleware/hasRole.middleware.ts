import { NextFunction, Request, RequestHandler, Response } from 'express';
import { AppError } from '../exceptions/AppError';
import { Role } from '../interfaces';
import { cookieExtractorAccessToken, validateJWTToken } from '../../authentication';

export const hasRole = (permissions: Array<Role | 'not-auth'>): RequestHandler => {
  return (req: Request, res: Response, next: NextFunction): void => {
    const sessionUser = validateJWTToken(cookieExtractorAccessToken(req), 'access');
    console.log(sessionUser, permissions, req.cookies);
    if (permissions.includes('not-auth') && !sessionUser) next();
    else if (permissions.includes(sessionUser.role)) {
      next();
    } else {
      next(AppError.ConflictError('Вы уже авторизованы!'));
    }
  };
};
