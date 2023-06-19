import bodyParser from 'body-parser';
import cors from 'cors';
import express, { Application } from 'express';
import initDatabases from './provider/init';
import routes from './routes';

const app: Application = express();
initDatabases();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api/v1', routes);

app.all('*', (req, res, next) => {
  next(new Error(`Cant find ${req.originalUrl} on this server!`));
});

export default app;
