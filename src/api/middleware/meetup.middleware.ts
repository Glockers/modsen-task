import { TCreateMeetupDTO, createMeetupSchema, updateMeetupSchema } from '../dto/meetup.dto';
import { validateDTO } from './validateDTO.middlware';

export function createValidationMiddleware() {
  return validateDTO<TCreateMeetupDTO>(createMeetupSchema);
}

export function updateValidationMiddleware() {
  return validateDTO<Partial<TCreateMeetupDTO>>(updateMeetupSchema);
}
