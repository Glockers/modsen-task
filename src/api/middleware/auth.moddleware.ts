import { TCreateUserDTO, validUserSchema } from '../dto/user.dto';
import { validateDTO } from './validateDTO.middlware';

export function validateUserDTO() {
  return validateDTO<TCreateUserDTO>(validUserSchema);
}
