import { Schema } from 'joi';
import { NextFunction, Request, Response } from 'express';
import { isEmptyObject } from '../helpers/objectUtils';
import createLogger from './logger';

const logger = createLogger(__filename);

export type TValidatePayload<T> = Request & { validatedPayload?: T }

export function validateDTO<TPayload extends object>(schema: Schema<TPayload>) {
  return function validateMiddleware(req: TValidatePayload<TPayload>, res: Response, next: NextFunction) {
    const payload: TPayload = req.body;
    if (isEmptyObject(payload)) {
      res.status(400).send({
        status: 400,
        message: 'Ничего не введено'
      });
      return;
    }
    const validationResult = schema.validate(payload);
    if (validationResult.error) {
      res.status(400).send(validationResult.error.details);
      logger.error(validationResult.error.details);
    } else {
      req.validatedPayload = validationResult.value;
      next();
    }
  };
}
