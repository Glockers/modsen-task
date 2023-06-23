import Joi from 'joi';
import { TCreateMeetupDTO, TFilterMeetupsDTO } from '../interfaces/meetupDTO.interface';

// TODO мигрировать на Zod
export const createMeetupSchema = Joi.object<TCreateMeetupDTO>({
  title: Joi.string().required(),
  description: Joi.string(),
  location: Joi.string().required(),
  date: Joi.date().required(),
  tags: Joi.array().items(Joi.string()).required()
});

// TODO мигрировать на Zod
export const updateMeetupSchema = Joi.object<Partial<TCreateMeetupDTO>>({
  title: Joi.string(),
  description: Joi.string(),
  location: Joi.string(),
  date: Joi.date(),
  tags: Joi.array().items(Joi.string())
});

// TODO мигрировать на Zod
export const filterMeetupsSchema = Joi.object<TFilterMeetupsDTO>({
  search: Joi.string(),
  filter: Joi.array().items(Joi.string()),
  page: Joi.number().integer().min(1),
  limit: Joi.number().integer().min(1)
});
