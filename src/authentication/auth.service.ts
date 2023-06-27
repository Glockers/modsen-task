import jwt from 'jsonwebtoken';
import { IUserJWT } from '../models';
import jwtConfig from '../config/jwt.config';

export function generateTokens<T extends Object>(object: T) {
  const accessToken = jwt.sign(object, jwtConfig.JWT_ACCESS_SECRET, { expiresIn: jwtConfig.ACCESS_TOKEN_EXPIRATION });
  const refreshToken = jwt.sign(object, jwtConfig.JWT_REFRESH_SECRET, { expiresIn: jwtConfig.REFRESH_TOKEN_EXPIRATION });
  return { accessToken, refreshToken };
}

export function validateJWTToken(token: string, type: 'access' | 'refresh'): IUserJWT | null {
  try {
    const data = jwt.verify(token, type === 'access' ? jwtConfig.JWT_ACCESS_SECRET : jwtConfig.JWT_REFRESH_SECRET) as IUserJWT;
    return data;
  } catch (e) {
    return null;
  }
}
