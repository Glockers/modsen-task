import { NextFunction, Request, Response } from 'express';
import { TValidatePayload } from '../../common/utils/validateDTO';
// import jwt from 'jsonwebtoken';
import { IUserDTO, IUserJWT, TCreateUserDTO } from '..';
import { getProfileService, logIn, signUp } from './user.service';
import appConfig from '../../config/app.config';
import { ITokenPair } from '../../authentication/interfaces/token.inteface';
import { validateJWTToken } from '../../authentication/sesssion.service';
import { catchAsyncFunction } from '../../common/exceptions/catchAsync';

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

// TODO
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

export const getProfileController = catchAsyncFunction(async (req: Request, res: Response, next: NextFunction) => {
  const user: IUserJWT = req.user as IUserJWT;
  const result = await getProfileService(user);
  res.status(result.status).json(result.data);
});
