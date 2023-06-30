import { NextFunction, Request, Response } from 'express';

import { catchAsyncFunction } from '../common/helpers/catchAsync';
import { TValidatePayload } from '../common/utils';
import { IUserDTO, IUserJWT, TCreateUserDTO } from '../modules';
import { appConfig } from '../config';
import { httpStatus } from '../common/types';
import { authService } from './auth.service';
import { extractRefreshToken } from './strategies/refresh.strategy';

class AuthController {
  public signUpController = catchAsyncFunction(async (req: TValidatePayload<TCreateUserDTO>, res: Response) => {
    const validationPayload = req.validatedPayload;
    const registedUser = await authService.signUp(validationPayload);
    res.status(httpStatus.CREATED).json(registedUser);
  });

  public loginController = catchAsyncFunction(async (req: TValidatePayload<IUserDTO>, res: Response) => {
    const validationPayload = req.validatedPayload;
    const tokens = await authService.logIn(validationPayload);
    res.cookie('jwt_tokens', tokens, {
      httpOnly: true,
      secure: appConfig.APP_NODE_ENV === 'production'
    }).sendStatus(httpStatus.NO_CONTENT);
  });

  public refreshAccessToken = catchAsyncFunction(async (req: Request, res: Response, next: NextFunction) => {
    const token = extractRefreshToken(req);
    const decoded = authService.verifyJWTToken(token, 'refresh');
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

export const authController = new AuthController();
