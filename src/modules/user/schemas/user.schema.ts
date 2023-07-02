import Joi from 'joi';

export const loginUserSchema = Joi.object({
  login: Joi.string().min(6).required()
});
