import bodyParser from 'body-parser';
import cors from 'cors';
import express, { Application } from 'express';
import initDatabases from './provider/init';
import routes from './common/routes';
import cookieParser from 'cookie-parser';
import passport from './authentication/sesssion.service';
import { authenticate } from './common/middleware/auth.middleware';
import { hasRole } from './common/middleware/hasRole.middleware';

const app: Application = express();
initDatabases();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(passport.initialize());

// TODO REMOVE
app.get('/protected', authenticate('access'), hasRole(['user', 'admin']), (req, res) => {
  res.json({ message: 'Защищенный маршрут' });
});

// Routes
app.use('/api/v1', routes);

app.all('*', (req, res, next) => {
  next(new Error(`Cant find ${req.originalUrl} on this server!`));
});

export default app;
