import { Request } from 'express';
import { Strategy as JwtStrategy, VerifiedCallback, StrategyOptions } from 'passport-jwt';
import { IAuthCredentialsDTO } from '../modules';
import { jwtConfig } from '../config/jwt.config';
import { ITokenPair } from './interfaces/token.inteface';
import passport from 'passport';
import { userRepository } from '../modules/user/user.repository';

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
  if (userRepository.findUserByLogin(payload.login)) {
    done(null, payload);
  } else {
    done('Unauthorized1', false);
  }
});

passport.use('access', accessJWTStrategy);

export { passport };
