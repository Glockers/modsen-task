import { TCreateUserDTO } from '../models';
import { validUserSchema } from '../models/user/schemas/user.shema';
import { validateDTO } from '../common/utils/validateDTO';
import { RequestHandler } from 'express';
import passport from 'passport';

export function validateUserDTO() {
  return validateDTO<TCreateUserDTO>(validUserSchema);
}

export function authenticate(stratagy: string): RequestHandler {
  return passport.authenticate('access', { session: false });
}
