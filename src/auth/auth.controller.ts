import { NextFunction, Request, Response } from 'express';
import { catchAsyncFunction } from '../common/helpers/catchAsync';
import { appConfig } from '../config';
import { httpStatus } from '../common/types';
import { extractTokenFromCookies } from './strategies/jwt.strategy';
import { JwtStrategyType } from '../common/types/strategy.enum';
import { Inject, Service } from 'typedi';
import { AuthService } from './auth.service';
import { IAuthCredentialsDTO, IUserJWT, TCreateUserDTO } from '../modules/user/interfaces';
import { extractDataFromBody } from '../common/utils/exctractorRequest';

@Service()
export class AuthController {
  @Inject()
  private authService: AuthService;

  public signUpController = catchAsyncFunction(async (req: Request, res: Response) => {
    const validationPayload = extractDataFromBody<TCreateUserDTO>(req);
    const registedUser = await this.authService.signUp(validationPayload);
    res.status(httpStatus.CREATED).json(registedUser);
  });

  public loginController = catchAsyncFunction(async (req: Request, res: Response) => {
    const validationPayload = extractDataFromBody<IAuthCredentialsDTO>(req);
    const tokens = await this.authService.logIn(validationPayload);
    res.cookie('jwt_tokens', tokens, {
      httpOnly: true,
      secure: appConfig.APP_NODE_ENV === 'production'
    }).sendStatus(httpStatus.NO_CONTENT);
  });

  public refreshAccessToken = catchAsyncFunction(async (req: Request, res: Response, next: NextFunction) => {
    const token = extractTokenFromCookies(req, JwtStrategyType.REFRESH_JWT_STRATEGY);
    const decoded = this.authService.verifyJWTToken(token, 'refresh');
    const user: IUserJWT = { login: decoded.login, role: decoded.role };
    res.cookie('jwt_tokens', user, {
      httpOnly: true,
      secure: appConfig.APP_NODE_ENV === 'production'
    }).sendStatus(httpStatus.NO_CONTENT);
  });

  public logOutController = catchAsyncFunction(async (req: Request, res: Response, next: NextFunction) => {
    res.clearCookie('jwt_tokens');
    res.status(httpStatus.OK).json({ message: 'User logged out successfully' });
  });
}
