import bodyParser from 'body-parser';
import cors from 'cors';
import express, { Application } from 'express';
import initDatabases from './provider/init';
import routes from './common/routes';
import cookieParser from 'cookie-parser';
import { errorHandler } from './common/middleware/errorHandler.middleware';
import { logErrors } from './common/middleware/loggerError.middleware';
import { AppError } from './common/exceptions/AppError';
import passport from './auth/access.strategy';
import swaggerDocs from './common/utils/swagger';
import appConfig from './config/app.config';

const app: Application = express();
initDatabases();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(passport.initialize());

app.use('/api/v1', routes);

swaggerDocs(app, appConfig.APP_PORT);

app.all('*', (req, res, next) => {
  next(AppError.NotFound(`Cant find ${req.originalUrl} on this server!`));
});

app.use(logErrors);
app.use(errorHandler);

export default app;
