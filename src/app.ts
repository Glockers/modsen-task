import 'reflect-metadata';
import express, { Application } from 'express';
import { useRoutes } from './common/routes/initRoutes';
import { initDatabase } from './infra';
import { initMiddlewares } from './common/middleware/initMiddleware';
import cors from 'cors';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';

function bootstrap(): Application {
  const app: Application = express();

  // Init typeorm
  initDatabase();

  // Init app
  app.use(cors());
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(cookieParser());
  useRoutes(app);
  initMiddlewares(app);

  return app;
}

export { bootstrap };
