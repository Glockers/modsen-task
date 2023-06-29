import { Schema } from 'joi';
import { NextFunction, Request, Response } from 'express';
import { isEmptyObject } from '../helpers';
import { AppError } from '../exceptions';

export type TValidatePayload<T> = Request & { validatedPayload?: T }

export function validateDTO<TPayload extends object>(schema: Schema<TPayload>, isEmpty = false) {
  return function validateMiddleware(req: TValidatePayload<TPayload>, res: Response, next: NextFunction) {
    const payload: TPayload = req.body;
    if (isEmptyObject(payload) && !isEmpty) {
      next(AppError.BadRequest('Ничего не введено'));
    }
    const validationResult = schema.validate(payload);
    if (validationResult.error) {
      const errorMessages = validationResult.error.details.map((error) => error.message);
      const errorMessage = errorMessages.join(', ');
      next(AppError.BadRequest(`validation: ${errorMessage}`));
    } else {
      req.validatedPayload = validationResult.value;
      next();
    }
  };
}
