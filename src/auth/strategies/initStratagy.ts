import passport from 'passport';
import { createJwtStrategy } from './jwt.strategy';
import { JwtStrategyType } from '../../common/types/strategy.enum';

passport.use(JwtStrategyType.REFRESH_JWT_STRATEGY, createJwtStrategy(JwtStrategyType.REFRESH_JWT_STRATEGY));
passport.use(JwtStrategyType.ACCESS_JWT_STRATEGY, createJwtStrategy(JwtStrategyType.ACCESS_JWT_STRATEGY));

export { passport };
