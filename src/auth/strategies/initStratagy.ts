import passport from 'passport';
import { accessJWTStrategy } from './access.strategy';
import { refreshJWTStrategy } from './refresh.strategy';
import { JWTStrategy } from '../../common/types/strategy.enum';

passport.use(JWTStrategy.REFRESH_JWT_STRATEGY, refreshJWTStrategy);
passport.use(JWTStrategy.ACCESS_JWT_STRATEGY, accessJWTStrategy);

export { passport };
