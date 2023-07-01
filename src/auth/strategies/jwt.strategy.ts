import { Request } from 'express';
import { Strategy as JwtStrategy, StrategyOptions } from 'passport-jwt';
import { jwtConfig } from '../../config/jwt.config';
import { ITokenPair } from '../interfaces/token.inteface';
import { authService } from '../auth.service';
import { JwtStrategyType } from '../../common/types/strategy.enum';

export function extractTokenFromCookies(req: Request, typeStrategy: JwtStrategyType): string | null {
  const tokens: ITokenPair | undefined = req.cookies?.jwt_tokens;

  if (req && tokens) {
    return typeStrategy === JwtStrategyType.ACCESS_JWT_STRATEGY ? tokens.accessToken : tokens.refreshToken;
  }
  return null;
};

export function createJwtStrategy(typeStrategy: JwtStrategyType): JwtStrategy {
  const secretOrKey: string = typeStrategy === JwtStrategyType.ACCESS_JWT_STRATEGY ? jwtConfig.JWT_ACCESS_SECRET : jwtConfig.JWT_REFRESH_SECRET;
  const jwtFromRequest = (req: Request) => extractTokenFromCookies(req, typeStrategy);

  const jwtOptions: StrategyOptions = {
    secretOrKey,
    jwtFromRequest
  };

  return new JwtStrategy(jwtOptions, authService.validateJWTToken);
}
