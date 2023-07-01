import { Inject, Service } from 'typedi';
import { NextFunction, Request, Response } from 'express';
import { IUserJWT } from '..';
import { catchAsyncFunction } from '../../common/helpers/catchAsync';
import { httpStatus } from '../../common/types';
import { AuthService, extractTokenFromCookies } from '../../auth';
import { JwtStrategyType } from '../../common/types/strategy.enum';
import { UserService } from './user.service';

@Service()
export class UserController {
  @Inject()
  private readonly userService: UserService;

  @Inject()
  private readonly authService: AuthService;

  public getProfileController = catchAsyncFunction(async (req: Request, res: Response, next: NextFunction) => {
    const token = extractTokenFromCookies(req, JwtStrategyType.ACCESS_JWT_STRATEGY);
    const decoded = this.authService.verifyJWTToken(token, 'access');
    const user: IUserJWT = { login: decoded.login, role: decoded.role };
    const profile = await this.userService.getProfileService(user);
    res.status(httpStatus.OK).json({
      data: profile,
      status: httpStatus.OK
    });
  });
}
