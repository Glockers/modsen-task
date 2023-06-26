import { TCreateMeetupDTO, TFilterMeetupsDTO, TUpdateMeetupDTO, createMeetupSchema, filterMeetupsSchema, updateMeetupSchema } from '../../models';
import { validateDTO } from '../utils/validateDTO';

export function createValidationMiddleware() {
  return validateDTO<TCreateMeetupDTO>(createMeetupSchema);
}

export function updateValidationMiddleware() {
  return validateDTO<Partial<TUpdateMeetupDTO>>(updateMeetupSchema);
}

export function filderValidationMiddleware() {
  return validateDTO<TFilterMeetupsDTO>(filterMeetupsSchema, true);
}
