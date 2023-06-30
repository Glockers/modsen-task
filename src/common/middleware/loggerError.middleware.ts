import { NextFunction, Request, Response } from 'express';
import { createLogger } from '../utils';

const logger = createLogger(__filename);

export function logErrors(err: Error, req: Request, res: Response, next: NextFunction) {
  logger.error({
    messageError: err.message,
    stackTrace: err.stack
  });

  next(err);
}
