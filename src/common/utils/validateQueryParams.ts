import { NextFunction, Response, Request } from 'express';
import { Schema } from 'joi';
import { AppError } from '../exceptions';
import { extractDataFromParams, extractDataFromQuery } from './exctractorRequest';

export function validateQueryParams<TParams extends Schema>(schema: TParams, type: 'query' | 'param' = 'param') {
  return function validateMiddleware(req: Request, res: Response, next: NextFunction) {
    const payload = type === 'param' ? extractDataFromParams(req) : extractDataFromQuery(req);
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
