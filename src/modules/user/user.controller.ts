import { NextFunction, Request, Response } from 'express';
import { IUserJWT } from '..';

import { catchAsyncFunction } from '../../common/helpers/catchAsync';
import { httpStatus } from '../../common/types';
import { userService } from './user.service';
import { authService, extractTokenFromCookies } from '../../auth';
import { JwtStrategyType } from '../../common/types/strategy.enum';

export class UserController {
  public getProfileController = catchAsyncFunction(async (req: Request, res: Response, next: NextFunction) => {
    const token = extractTokenFromCookies(req, JwtStrategyType.ACCESS_JWT_STRATEGY);
    const decoded = authService.verifyJWTToken(token, 'access');
    console.log(decoded);
    const user: IUserJWT = { login: decoded.login, role: decoded.role };
    const profile = await userService.getProfileService(user);
    res.status(httpStatus.OK).json({
      data: profile,
      status: httpStatus.OK
    });
  });
}

export const userController = new UserController();
