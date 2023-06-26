import { NextFunction, Response, Request } from 'express';
import { AppError } from '../exceptions/AppError';
import { Schema } from 'joi';

export function validateQueryParams<TParams extends Schema>(schema: TParams) {
  return function validateMiddleware(req: Request, res: Response, next: NextFunction) {
    const payload = req.params;
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
