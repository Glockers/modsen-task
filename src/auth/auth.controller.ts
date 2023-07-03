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
import { COOKIE_JWT_TOKENS } from './interfaces/jwt.interface';
import { MESSAGE_LOGGED_OUT_SUCCESSFULLY } from './constants/message';

@Service()
export class AuthController {
  @Inject()
  private readonly authService: AuthService;

  public signUpController = catchAsyncFunction(async (req: Request, res: Response) => {
    const validationPayload = extractDataFromBody<TCreateUserDTO>(req);
    const registedUser = await this.authService.signUp(validationPayload);
    res.status(httpStatus.CREATED).json(registedUser);
  });

  public loginController = catchAsyncFunction(async (req: Request, res: Response) => {
    const validationPayload = extractDataFromBody<IAuthCredentialsDTO>(req);
    const tokens = await this.authService.logIn(validationPayload);
    res.cookie(COOKIE_JWT_TOKENS, tokens, {
      httpOnly: true,
      secure: appConfig.APP_NODE_ENV === 'production'
    }).sendStatus(httpStatus.NO_CONTENT);
  });

  public refreshAccessToken = catchAsyncFunction(async (req: Request, res: Response, next: NextFunction) => {
    const token = extractTokenFromCookies(req, JwtStrategyType.REFRESH_JWT_STRATEGY);
    const decoded = this.authService.verifyJWTToken(token, 'refresh');
    const user: IUserJWT = { login: decoded.login, role: decoded.role };
    res.cookie(COOKIE_JWT_TOKENS, user, {
      httpOnly: true,
      secure: appConfig.APP_NODE_ENV === 'production'
    }).sendStatus(httpStatus.NO_CONTENT);
  });

  public logOutController = catchAsyncFunction(async (req: Request, res: Response, next: NextFunction) => {
    res.clearCookie(COOKIE_JWT_TOKENS);
    res.status(httpStatus.OK).json({ message: MESSAGE_LOGGED_OUT_SUCCESSFULLY });
  });
}
