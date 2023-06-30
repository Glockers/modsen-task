import { Request } from 'express';
import { Strategy as JwtStrategy, StrategyOptions } from 'passport-jwt';
import { jwtConfig } from '../../config/jwt.config';
import { ITokenPair } from '../interfaces/token.inteface';
import { authService } from '../auth.service';

export const extractAccessToken = (req: Request): string | null => {
  const tokens: ITokenPair = req.cookies?.jwt_tokens;

  if (req && tokens) {
    return tokens.accessToken;
  }
  return null;
};

const jwtOptions: StrategyOptions = {
  secretOrKey: jwtConfig.JWT_ACCESS_SECRET,
  jwtFromRequest: extractAccessToken
};

export const accessJWTStrategy = new JwtStrategy(jwtOptions, authService.validateJWTToken);
