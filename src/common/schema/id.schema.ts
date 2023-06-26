import Joi from 'joi';

// TODO мигрировать на Zod
export const idNumberSchema = Joi.object({
  id: Joi.number().min(0)
});
