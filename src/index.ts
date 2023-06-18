import express, { Application } from 'express';
import 'dotenv/config';
import bodyParser from 'body-parser';
import dbInit from './db/init';
import routes from './api/routes';
import createLogger from './api/utils/logger';
import passport from 'passport';
import { accessJWTStrategy } from './config/jwt/jwt.module';
import { authenticateAccess } from './api/middleware/authenticateAccess.middleware';
import cors from 'cors';

const logger = createLogger(__filename);
dbInit();

const app: Application = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(passport.initialize());

passport.use('access', accessJWTStrategy);

app.get('/protected', authenticateAccess, (req: any, res: any) => {
  res.json({ message: 'Защищенный маршрут' });
});

app.use('/api/v1', routes);

app.listen(PORT, () => {
  logger.info(`[server]: Server is running at ${process.env.API_HOST}:${PORT}`);
});
