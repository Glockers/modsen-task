import { NextFunction, Request, RequestHandler, Response } from 'express';
import { IUserJWT } from '../../models';
import { AppError } from '../exceptions/AppError';

// TODO change any
export const hasRole = (permitions: Array<any>): RequestHandler => {
  return (req: Request, res: Response, next: NextFunction): void => {
    const user: IUserJWT = req.user as IUserJWT;
    if (permitions.includes(user.role)) {
      next();
    } else {
      next(AppError.NoPermission());
    }
  };
};
