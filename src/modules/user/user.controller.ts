import { Inject, Service } from 'typedi';
import { NextFunction, Request, Response } from 'express';
import { catchAsyncFunction } from '../../common/helpers/catchAsync';
import { httpStatus } from '../../common/types';
import { AuthService, extractTokenFromCookies } from '../../auth';
import { JwtStrategyType } from '../../common/types/strategy.enum';
import { UserService } from './user.service';
import { IUserJWT } from './interfaces';
import { AppError } from '../../common/exceptions';
import { LoginUserRequest } from './interfaces/request.interface';
import { extractDataFromParams } from '../../common/utils/exctractorRequest';

@Service()
export class UserController {
  @Inject()
  private readonly userService: UserService;

  @Inject()
  private readonly authService: AuthService;

  public getProfile = catchAsyncFunction(async (req: Request, res: Response, next: NextFunction) => {
    const token = extractTokenFromCookies(req, JwtStrategyType.ACCESS_JWT_STRATEGY);
    const decoded = this.authService.verifyJWTToken(token, 'access');
    const user: IUserJWT = { login: decoded.login, role: decoded.role };
    const profile = await this.userService.getProfile(user);
    res.status(httpStatus.OK).json({
      data: profile,
      status: httpStatus.OK
    });
  });

  public getMyMeetups = catchAsyncFunction(async (req: Request, res: Response, next: NextFunction) => {
    const user: IUserJWT = this.authService.verifyJWTToken(extractTokenFromCookies(req, JwtStrategyType.ACCESS_JWT_STRATEGY), 'access');
    const myMeetups = await this.userService.getUserRegistrations(user);
    res.status(httpStatus.OK).json({
      data: myMeetups,
      status: httpStatus.OK
    });
  });

  public deleteUser = catchAsyncFunction(async (req: LoginUserRequest, res: Response, next: NextFunction) => {
    const { login } = extractDataFromParams(req);
    const session = this.authService.verifyJWTToken(extractTokenFromCookies(req, JwtStrategyType.ACCESS_JWT_STRATEGY), 'access');

    if (login === session.login) {
      throw AppError.ConflictError('Вы не можете удалить самого себя');
    };

    const myMeetups = await this.userService.deleteByLogin(login);
    res.status(httpStatus.OK).json({
      data: myMeetups,
      status: httpStatus.OK
    });
  });

  public getUsers = catchAsyncFunction(async (req: Request, res: Response, next: NextFunction) => {
    const users = await this.userService.getAllUsers();
    res.status(httpStatus.OK).json({
      data: users,
      status: httpStatus.OK
    });
  });
}
