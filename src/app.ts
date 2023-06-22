import bodyParser from 'body-parser';
import cors from 'cors';
import express, { Application } from 'express';
import initDatabases from './provider/init';
import routes from './common/routes';
import cookieParser from 'cookie-parser';
import { authenticate } from './common/middleware/auth.middleware';
import { hasRole } from './common/middleware/hasRole.middleware';
import { errorHandler } from './common/middleware/errorHandler.middleware';
import { logErrors } from './common/middleware/loggerError.middleware';
import { AppError } from './common/exceptions/AppError';
import passport from './authentication/access.strategy';
import { Role } from './common';

const app: Application = express();
initDatabases();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(passport.initialize());

// TODO REMOVE
app.get('/protected', authenticate('access'), hasRole([Role.USER, Role.ADMIN]), (req, res) => {
  res.json({ message: 'Защищенный маршрут' });
});

// Routes
app.use('/api/v1', routes);

app.all('*', (req, res, next) => {
  next(AppError.NotFound(`Cant find ${req.originalUrl} on this server!`));
});

app.use(logErrors);
app.use(errorHandler);

export default app;
