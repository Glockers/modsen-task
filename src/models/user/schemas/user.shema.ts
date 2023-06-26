import Joi from 'joi';
import { TCreateUserDTO } from '../interfaces/userDTO.interface';

export const validUserSchema = Joi.object<TCreateUserDTO>({
  login: Joi.string().required(),
  password: Joi.string().required().min(5).max(12)
});
