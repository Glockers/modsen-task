import { Schema } from 'joi';
import { NextFunction, Request, Response } from 'express';
import { isEmptyObject } from '../helpers/objectUtils';
import { AppError } from '../exceptions/AppError';

export type TValidatePayload<T> = Request & { validatedPayload?: T }

export function validateDTO<TPayload extends object>(schema: Schema<TPayload>) {
  return function validateMiddleware(req: TValidatePayload<TPayload>, res: Response, next: NextFunction) {
    const payload: TPayload = req.body;
    if (isEmptyObject(payload)) {
      throw AppError.BadRequest('Ничего не введено');
    }
    const validationResult = schema.validate(payload);
    if (validationResult.error) {
      throw AppError.BadRequest('validation: ' + validationResult.error.details);
    } else {
      req.validatedPayload = validationResult.value;
      next();
    }
  };
}
