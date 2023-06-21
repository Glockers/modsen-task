import { NextFunction, Request, Response } from 'express';
import { AsyncFunction } from '../interfaces/asyncFunction';

export function catchAsyncFunction(asyncFunction: AsyncFunction) {
  return (req: Request, res: Response, next: NextFunction) => {
    asyncFunction(req, res, next).catch(next);
  };
}
