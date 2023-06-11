import { checkDatabaseConnection } from './config/db.config';
import Meetup from './models/Meetup';

const isDev = process.env.NODE_ENV === 'development';

const dbInit = () => Promise.all([
  isDev ? checkDatabaseConnection() : undefined,
  Meetup.sync({ alter: isDev })
]);
export default dbInit;
