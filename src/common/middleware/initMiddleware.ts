import { Application } from 'express';
import { swaggerDocs } from '../utils';
import { appConfig } from '../../config';
import { logErrors } from './loggerError.middleware';
import { errorHandler } from './errorHandler.middleware';
import { passport } from '../../auth/strategies/initStratagy';

export const initMiddlewares = (app: Application): void => {
  app.use(passport.initialize());
  swaggerDocs(app, appConfig.APP_PORT);

  app.use(logErrors);
  app.use(errorHandler);
};
