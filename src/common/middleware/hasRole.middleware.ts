import { NextFunction, Request, RequestHandler, Response } from 'express';
import { IUserJWT } from '../../models';
import { AppError } from '../exceptions/AppError';
import { Role } from '../interfaces';

export const hasRole = (permissions: Array<Role | 'not-auth'>): RequestHandler => {
  return (req: Request, res: Response, next: NextFunction): void => {
    const user: IUserJWT = req.user as IUserJWT;
    if (permissions.includes('not-auth') && user.role) next();
    else if (permissions.includes(user.role)) {
      next();
    } else {
      next(AppError.NoPermission());
    }
  };
};
