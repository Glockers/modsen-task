import { checkDatabaseConnection } from './config/db.config';
import Meetup from './models/Meetup';
import User from './models/User';

const isDev = true;

const dbInit = () => Promise.all([
  isDev ? checkDatabaseConnection() : undefined,
  Meetup.sync({ alter: isDev }),
  User.sync({ alter: isDev })
]);
export default dbInit;
