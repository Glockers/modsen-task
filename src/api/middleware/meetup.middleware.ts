import { NextFunction, Request, Response } from 'express';
import { TCreateMeetupDTO, createMeetupSchema } from '../dto/meetup.dto';
import createLogger from '../utils/logger';

const logger = createLogger(__filename);

export type TValidatePayload = Request & { validatedPayload?: TCreateMeetupDTO }

export function createMeetupValidationMiddleware(req: TValidatePayload, res: Response, next: NextFunction) {
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
