import { userLoginSchema, userSignUpSchema } from '../../auth/schemas/auth.schema';
import { RequestHandler } from 'express';
import passport from 'passport';
import { validateDTO } from '../utils';
import { IAuthCredentialsDTO, TCreateUserDTO } from '../../models';

export function validateLogInDTO() {
  return validateDTO<IAuthCredentialsDTO>(userLoginSchema);
}

export function validateRegInDTO() {
  return validateDTO<TCreateUserDTO>(userSignUpSchema);
}

export function authenticate(stratagy: string): RequestHandler {
  return passport.authenticate('access', { session: false });
}
