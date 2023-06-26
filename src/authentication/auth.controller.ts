import { NextFunction, Request, Response } from 'express';

import { catchAsyncFunction } from '../common/exceptions/catchAsync';
import { TValidatePayload } from '../common/utils';
import { IUserDTO, IUserJWT, TCreateUserDTO } from '../models';
import { logIn, signUp } from '../models/user/user.service';
import appConfig from '../config/app.config';
import { validateJWTToken } from './auth.service';
import { ITokenPair } from './interfaces/token.inteface';

export const signUpController = catchAsyncFunction(async (req: TValidatePayload<TCreateUserDTO>, res: Response) => {
  const validationPayload = req.validatedPayload;
  const result = await signUp(validationPayload);
  res.status(result.status).json(result);
});

export const loginController = catchAsyncFunction(async (req: TValidatePayload<IUserDTO>, res: Response) => {
  const validationPayload = req.validatedPayload;
  const result = await logIn(validationPayload);
  res.status(result.status).cookie('jwt_tokens', result.data, {
    httpOnly: true,
    secure: appConfig.APP_NODE_ENV === 'production'
  }).end();
});

export const refreshAccessToken = catchAsyncFunction(async (req: Request, res: Response, next: NextFunction) => {
  const tokens: ITokenPair = req.cookies.jwt_tokens;
  const decoded = validateJWTToken(tokens.refreshToken, 'refresh');

  const user: IUserJWT = { login: decoded.login, role: decoded.role };
  res.status(204).cookie('jwt_tokens', user, {
    httpOnly: true,
    secure: appConfig.APP_NODE_ENV === 'production'
  }).end();
});

export const logOutController = catchAsyncFunction(async (req: Request, res: Response, next: NextFunction) => {
  res.clearCookie('jwt_tokens');
  res.status(200).json({ message: 'User logged out successfully' });
});
