import Joi from 'joi';

export interface IUserDTO {
  id: number;
  login: string;
  password: string;
  role: string;
}

export type TCreateUserDTO = Omit<IUserDTO, 'id' | 'role'>;

export const validUserSchema = Joi.object<TCreateUserDTO>({
  login: Joi.string().required(),
  password: Joi.string().required().min(5).max(12)
});
