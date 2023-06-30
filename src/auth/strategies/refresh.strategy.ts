import { Request } from 'express';
import { ITokenPair } from '../interfaces/token.inteface';
import { jwtConfig } from '../../config';
import { Strategy as JwtStrategy, StrategyOptions } from 'passport-jwt';
import { authService } from '../auth.service';

export function extractRefreshToken(req: Request): string | null {
  const tokens: ITokenPair = req.cookies?.jwt_tokens;

  if (req && tokens) {
    return tokens.refreshToken;
  }
  return null;
}

const jwtOptions: StrategyOptions = {
  secretOrKey: jwtConfig.JWT_REFRESH_SECRET,
  jwtFromRequest: extractRefreshToken
};

export const refreshJWTStrategy = new JwtStrategy(jwtOptions, authService.validateJWTToken);
