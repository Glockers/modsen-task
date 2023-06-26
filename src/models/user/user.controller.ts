import { NextFunction, Request, Response } from 'express';
import { IUserJWT } from '..';
import { getProfileService } from './user.service';

import { catchAsyncFunction } from '../../common/exceptions/catchAsync';

export const getProfileController = catchAsyncFunction(async (req: Request, res: Response, next: NextFunction) => {
  const user: IUserJWT = req.user as IUserJWT;
  const result = await getProfileService(user);
  res.status(result.status).json(result.data);
});
