import { TCreateMeetupDTO, TUpdateMeetupDTO, createMeetupSchema, filterMeetupsSchema, updateMeetupSchema } from '../../models';
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
