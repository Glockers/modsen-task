import { userLoginSchema, userSignUpSchema } from '../../auth/schemas/auth.schema';
import { RequestHandler } from 'express';
import passport from 'passport';
import { validateDTO } from '../utils';
import { httpStatus } from '../types';
import { EAuthMessageError } from '../types/authMessageError';
import { JwtStrategyType } from '../types/strategy.enum';
import { IAuthCredentialsDTO, TCreateUserDTO } from '../../modules/user/interfaces';

export function validateLogInDTO() {
  return validateDTO<IAuthCredentialsDTO>(userLoginSchema);
}

export function validateRegInDTO() {
  return validateDTO<TCreateUserDTO>(userSignUpSchema);
}

export function authenticate(strategy: JwtStrategyType, messageError: EAuthMessageError): RequestHandler {
  return (req, res, next) => {
    passport.authenticate(strategy, { session: false }, (err, user, info) => {
      if (err) {
        return next(err);
      }
      if (!user) {
        return res.status(httpStatus.UNAUTHORIZED).json({ status: httpStatus.UNAUTHORIZED, error: messageError });
      }

      return next();
    })(req, res, next);
  };
}
