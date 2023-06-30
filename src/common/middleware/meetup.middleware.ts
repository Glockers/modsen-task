import { TCreateMeetupDTO, TUpdateMeetupDTO } from '../../modules/meetup/interfaces';
import { createMeetupSchema, filterMeetupsSchema, updateMeetupSchema } from '../../modules/meetup/schemas/meetup.schema';
import { validateDTO, validateQueryParams } from '../utils';

export function createMeetupValidationMiddleware() {
  return validateDTO<TCreateMeetupDTO>(createMeetupSchema);
}

export function updateMeetupValidationMiddleware() {
  return validateDTO<Partial<TUpdateMeetupDTO>>(updateMeetupSchema);
}

export function filterMeetupValidationMiddleware() {
  return validateQueryParams(filterMeetupsSchema, 'query');
}
