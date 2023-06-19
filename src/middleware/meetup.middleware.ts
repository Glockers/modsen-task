import { TCreateMeetupDTO, TUpdateMeetupDTO, createMeetupSchema, updateMeetupSchema } from '../models';
import { validateDTO } from './validateDTO.middlware';

export function createValidationMiddleware() {
  return validateDTO<TCreateMeetupDTO>(createMeetupSchema);
}

export function updateValidationMiddleware() {
  return validateDTO<Partial<TUpdateMeetupDTO>>(updateMeetupSchema);
}
