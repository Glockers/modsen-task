import { NextFunction, Request, Response } from 'express';
import { IUserJWT } from '..';

import { catchAsyncFunction } from '../../common/helpers/catchAsync';
import { httpStatus } from '../../common/types';
import { userService } from './user.service';

export class UserController {
  public getProfileController = catchAsyncFunction(async (req: Request, res: Response, next: NextFunction) => {
    const user: IUserJWT = req.user as IUserJWT;
    const profile = await userService.getProfileService(user);
    res.status(httpStatus.OK).json({
      data: profile,
      status: httpStatus.OK
    });
  });
}

export const userController = new UserController();
