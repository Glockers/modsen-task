import { NextFunction, Request, Response } from 'express';
import createLogger from '../utils/logger';

const logger = createLogger(__filename);

export function logErrors(err: Error, req: Request, res: Response, next: NextFunction) {
  logger.error(err.message);
  next(err);
}