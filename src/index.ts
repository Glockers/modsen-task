import express, { Application, Request, Response } from 'express';
import 'dotenv/config';
import bodyParser from 'body-parser';
import logger from './api/utils/logger';
import dbInit from './db/init';

dbInit();
const app: Application = express();
const PORT = process.env.API_PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req: Request, res: Response) => {
  res.send('Express + TypeScript Server');
});

app.listen(PORT, () => {
  logger.info(`[server]: Server is running at ${process.env.API_HOST}:${PORT}`);
});
