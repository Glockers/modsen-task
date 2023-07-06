import { NextFunction, Request, Response } from 'express';
import { createLogger } from '../utils';

export function logErrors(err: Error, req: Request, res: Response, next: NextFunction) {
  const stackTrace = err.stack;
  const fileNameMatch = stackTrace.match(/\(([^)]+)\)/);
  const fileName = fileNameMatch ? fileNameMatch[1] : 'Unknown file';
  const logger = createLogger(fileName);
  logger.error({
    messageError: err.message,
    stackTrace: err.stack
  });

  next(err);
}
