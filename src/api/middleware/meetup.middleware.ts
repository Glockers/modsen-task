import { NextFunction, Request, Response } from 'express';
import { TCreateMeetupDTO, createMeetupSchema, updateMeetupSchema } from '../dto/meetup.dto';
import createLogger from '../utils/logger';

const logger = createLogger(__filename);

export type TValidatePayloadCreate = Request & { validatedPayload?: TCreateMeetupDTO }
export type TValidatePayloadUpdate = Request & { validatedPayload?: Partial<TCreateMeetupDTO> }

export function createMeetupValidationMiddleware(req: TValidatePayloadCreate, res: Response, next: NextFunction) {
  const payload: TCreateMeetupDTO = req.body;
  const createMeetupValidationResult = createMeetupSchema.validate(payload);
  if (createMeetupValidationResult.error) {
    res.status(400).send(createMeetupValidationResult.error.details);
    logger.error(createMeetupValidationResult.error.details);
  } else {
    req.validatedPayload = { ...createMeetupValidationResult.value };
    next();
  }
};

export function updateMeetupValidationMiddleware(req: TValidatePayloadUpdate, res: Response, next: NextFunction) {
  const payload: Partial<TCreateMeetupDTO> = req.body;
  const updateMeetupValidationResult = updateMeetupSchema.validate(payload);
  if (updateMeetupValidationResult.error) {
    res.status(400).send(updateMeetupValidationResult.error.details);
    logger.error(updateMeetupValidationResult.error.details);
  } else {
    req.validatedPayload = updateMeetupValidationResult.value;
    next();
  }
};
