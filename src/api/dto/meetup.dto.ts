import Joi from 'joi';

export type TCreateMeetupDTO = {
  title: string;
  description?: string;
  location: string;
  datetime: Date;
  tags: string[];
}

export type TUpdateMeetupDTO = TCreateMeetupDTO

export type TFilterMeetupsDTO = {
  search?: string;
  filter?: string[];
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
  page?: number;
  limit?: number;
}

export const createMeetupSchema = Joi.object<TCreateMeetupDTO>({
  title: Joi.string().required(),
  description: Joi.string(),
  location: Joi.string().required(),
  datetime: Joi.date().required(),
  tags: Joi.array().items(Joi.string()).required()
});

export const updateMeetupSchema = Joi.object<Partial<TCreateMeetupDTO>>({
  title: Joi.string(),
  description: Joi.string(),
  location: Joi.string(),
  datetime: Joi.date(),
  tags: Joi.array().items(Joi.string())
});

export const filterMeetupsSchema = Joi.object<TFilterMeetupsDTO>({
  search: Joi.string(),
  filter: Joi.array().items(Joi.string()),
  page: Joi.number().integer().min(1),
  limit: Joi.number().integer().min(1)
});
