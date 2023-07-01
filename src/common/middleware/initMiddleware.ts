import { Application } from 'express';
import { swaggerDocs } from '../utils';
import { appConfig } from '../../config';
import { logErrors } from './loggerError.middleware';
import { errorHandler } from './errorHandler.middleware';
import { passport } from '../../auth/strategies/initStratagy';
import { AppError } from '../exceptions';

export const initMiddlewares = (app: Application): void => {
  app.use(passport.initialize());
  swaggerDocs(app, appConfig.APP_PORT);

  app.all('*', (req, res, next) => {
    next(AppError.NotFound(`Cant find ${req.originalUrl} on this server!`));
  });
  app.use(logErrors);
  app.use(errorHandler);
};
