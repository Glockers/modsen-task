import Joi from 'joi';
import { IAuthCredentialsDTO, TCreateUserDTO } from '../../modules';

export const userLoginSchema = Joi.object<IAuthCredentialsDTO>({
  login: Joi.string().required(),
  password: Joi.string().required().min(5).max(12)
});

export const userSignUpSchema = Joi.object<TCreateUserDTO>({
  name: Joi.string().required(),
  login: Joi.string().required(),
  password: Joi.string().required().min(5).max(12)
});
