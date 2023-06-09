import { Schema } from 'joi';
import { NextFunction, Response } from 'express';
import { AppError } from '../exceptions';
import { BodyRequestType, extractDataFromBody } from './exctractorRequest';

const ERROR_EMPTY_INPUT = 'Ничего не введено';

export function validateDTO<T extends object>(schema: Schema<T>, isEmpty = false) {
  return function validateMiddleware(req: BodyRequestType<T>, res: Response, next: NextFunction) {
    const payload = extractDataFromBody<T>(req);
    if (!isEmpty && !payload) {
      next(AppError.BadRequest(ERROR_EMPTY_INPUT));
    }
    const validationResult = schema.validate(payload);
    if (validationResult.error) {
      const errorMessages = validationResult.error.details.map((error) => error.message);
      const errorMessage = errorMessages.join(', ');
      next(AppError.BadRequest(`validation: ${errorMessage}`));
    } else {
      next();
    }
  };
}
