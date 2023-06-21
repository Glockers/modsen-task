import { NextFunction, Request, Response } from 'express';
import { TValidatePayload } from '../common/utils/validateDTO';
// import jwt from 'jsonwebtoken';
import { IUserDTO, IUserJWT, TCreateUserDTO } from '../models';
import { logIn, signUp } from '../service/auth.service';
import appConfig from '../config/app.config';
import { ITokenPair } from '../authentication/interfaces/token.inteface';
import { validateJWTToken } from '../service/sesssion.service';

export const signUpController = async (req: TValidatePayload<TCreateUserDTO>, res: Response): Promise<void> => {
  const validationPayload = req.validatedPayload;
  const result = await signUp(validationPayload);
  res.status(result.status).json(result);
};

// TODO Change placestring on secure cookie
export const loginController = async (req: TValidatePayload<IUserDTO>, res: Response): Promise<void> => {
  const validationPayload = req.validatedPayload;
  const result = await logIn(validationPayload);
  res.status(result.status).cookie('jwt_tokens', result.data, {
    httpOnly: true,
    secure: appConfig.APP_NODE_ENV === 'production'
  }).end();
};

// TODO
export const refreshAccessToken = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const tokens: ITokenPair = req.cookies.jwt_tokens;
  try {
    const decoded = validateJWTToken(tokens.refreshToken, 'refresh');
    console.log(decoded);

    const user: IUserJWT = { login: decoded.login, role: decoded.role };
    res.status(204).cookie('jwt_tokens', user, {
      httpOnly: true,
      secure: appConfig.APP_NODE_ENV === 'production'
    }).end();
  } catch (err) {
    throw new Error('error with refresh');
  }
};

export const logOutController = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  res.clearCookie('jwt_tokens');
  res.status(200).json({ message: 'User logged out successfully' });
};
