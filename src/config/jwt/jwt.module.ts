import { Strategy as JwtStrategy, ExtractJwt, VerifiedCallback, StrategyOptions } from 'passport-jwt';
import jwt from 'jsonwebtoken';
import jwtConfig from './jwt.config';

interface UserPayload {
  username: string;
}

const jwtOptions: StrategyOptions = {
  secretOrKey: jwtConfig.JWT_ACCESS_SECRET,
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
};

// TODO
export const accessJWTStrategy = new JwtStrategy(jwtOptions, (payload: UserPayload, done: VerifiedCallback) => {
  const test = 1;
  if (test > 0) {
    return done(null, { username: test });
  } else {
    return done(null, false);
  }
});

export function generateTokens(user: UserPayload) {
  const accessToken = jwt.sign({ username: user.username }, jwtConfig.JWT_ACCESS_SECRET, { expiresIn: jwtConfig.ACCESS_TOKEN_EXPIRATION });
  const refreshToken = jwt.sign({ username: user.username }, jwtConfig.JWT_ACCESS_SECRET, { expiresIn: jwtConfig.REFRESH_TOKEN_EXPIRATION });
  return { accessToken, refreshToken };
}
