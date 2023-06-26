import { TCreateMeetupDTO, TUpdateMeetupDTO, createMeetupSchema, filterMeetupsSchema, updateMeetupSchema } from '../../models';
import { validateDTO } from '../utils/validateDTO';
import { validateQueryParams } from '../utils/validateQueryParams';

export function createValidationMiddleware() {
  return validateDTO<TCreateMeetupDTO>(createMeetupSchema);
}

export function updateValidationMiddleware() {
  return validateDTO<Partial<TUpdateMeetupDTO>>(updateMeetupSchema);
}

export function filderValidationMiddleware() {
  return validateQueryParams(filterMeetupsSchema, 'query');
}
