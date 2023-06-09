import Joi from 'joi';
import { IAuthCredentialsDTO, TCreateUserDTO } from '../../modules/user/interfaces';

export const userLoginSchema = Joi.object<IAuthCredentialsDTO>({
  login: Joi.string().required(),
  password: Joi.string().min(5).max(12).required()
});

export const userSignUpSchema = Joi.object<TCreateUserDTO>({
  name: Joi.string().required(),
  login: Joi.string().required(),
  password: Joi.string().min(5).max(12).required()
});
