import { userLoginSchema, userSignUpSchema } from '../../auth/schemas/auth.schema';
import { IAuthCredentialsDTO, TCreateUserDTO } from '../../models';
import { validateDTO } from '../utils/validateDTO';
import { RequestHandler } from 'express';
import passport from 'passport';

export function validateLogInDTO() {
  return validateDTO<IAuthCredentialsDTO>(userLoginSchema);
}

export function validateRegInDTO() {
  return validateDTO<TCreateUserDTO>(userSignUpSchema);
}

export function authenticate(stratagy: string): RequestHandler {
  return passport.authenticate('access', { session: false });
}
