import { Request } from 'express';
import { Strategy as JwtStrategy, VerifiedCallback, StrategyOptions } from 'passport-jwt';
import { IAuthCredentialsDTO } from '../models';
import jwtConfig from '../config/jwt.config';
import { findUserByLogin } from '../models/user/user.repository';
import { ITokenPair } from './interfaces/token.inteface';
import passport from 'passport';

export const cookieExtractorAccessToken = (req: Request): string => {
  const tokens: ITokenPair = req.cookies?.jwt_tokens;
  if (req && tokens) {
    return tokens.accessToken;
  }
  return null;
};

const jwtOptions: StrategyOptions = {
  secretOrKey: jwtConfig.JWT_ACCESS_SECRET,
  jwtFromRequest: cookieExtractorAccessToken
};

export const accessJWTStrategy = new JwtStrategy(jwtOptions, (payload: IAuthCredentialsDTO, done: VerifiedCallback) => {
  if (findUserByLogin(payload.login)) {
    done(null, payload);
  } else {
    done('Unauthorized1', false);
  }
});

passport.use('access', accessJWTStrategy);

export default passport;