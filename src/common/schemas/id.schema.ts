import Joi from 'joi';

export const idNumberSchema = Joi.object({
  id: Joi.number().min(0)
});
