import 'reflect-metadata';
import express, { Application } from 'express';
import { useRoutes } from './common/routes/initRoutes';
import { initDatabase } from './providers';
import { initMiddlewares } from './common/middleware/initMiddleware';
import cors from 'cors';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';

const app: Application = express();

function startServer(): void {
  app.use(cors());
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(cookieParser());

  useRoutes(app);

  initMiddlewares(app);
}

initDatabase(startServer);

export { app };
