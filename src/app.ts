import bodyParser from 'body-parser';
import cors from 'cors';
import express, { Application } from 'express';
import cookieParser from 'cookie-parser';
import { initDatabases } from './provider';
import { passport } from './auth';
import { appConfig } from './config';
import { globalRouter } from './common/routes/globalRoute';
import { AppError } from './common/exceptions';
import { logErrors, errorHandler } from './common/middleware';
import { swaggerDocs } from './common/utils';

const app: Application = express();
initDatabases();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(passport.initialize());

app.use('/api/v1', globalRouter);

swaggerDocs(app, appConfig.APP_PORT);

app.all('*', (req, res, next) => {
  next(AppError.NotFound(`Cant find ${req.originalUrl} on this server!`));
});

app.use(logErrors);
app.use(errorHandler);

export { app };
