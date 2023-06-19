import { TCreateUserDTO } from '../models';
import { validUserSchema } from '../models/user/schemas/user.shema';
import { validateDTO } from './validateDTO.middlware';

export function validateUserDTO() {
  return validateDTO<TCreateUserDTO>(validUserSchema);
}
