import express, { Application } from 'express';
import 'dotenv/config';
import bodyParser from 'body-parser';
import dbInit from './db/init';
import routes from './api/routes';
import createLogger from './api/utils/logger';

const logger = createLogger(__filename);
dbInit();
const app: Application = express();
const PORT = process.env.API_PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/api/v1', routes);

app.listen(PORT, () => {
  logger.info(`[server]: Server is running at ${process.env.API_HOST}:${PORT}`);
});
