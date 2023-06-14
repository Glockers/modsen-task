import { Strategy as JwtStrategy, ExtractJwt, VerifiedCallback, StrategyOptions } from 'passport-jwt';
import jwt from 'jsonwebtoken';

interface UserPayload {
  username: string;
}
// Конфигурация JWT-токенов
const jwtSecret = 'test_key';
const jwtOptions: StrategyOptions = {
  secretOrKey: jwtSecret,
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
};

export const accessJWTStrategy = new JwtStrategy(jwtOptions, (payload: UserPayload, done: VerifiedCallback) => {
  const test = 1;
  if (test > 0) {
    return done(null, { username: test });
  } else {
    return done(null, false);
  }
});

// Генерация Access и Refresh токенов
export function generateTokens(user: UserPayload) {
  const accessToken = jwt.sign({ username: user.username }, jwtSecret, { expiresIn: '15m' });
  const refreshToken = jwt.sign({ username: user.username }, jwtSecret, { expiresIn: '40m' });
  return { accessToken, refreshToken };
}
