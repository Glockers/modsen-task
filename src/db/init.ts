import { checkDatabaseConnection } from './config/db.config';
import Meetup from './models/Meetup';
import MeetupRegistration from './models/MeetupRegistration';
import User from './models/User';

const isGenerate = Boolean(process.env.GENERATE_TABLE);

const dbInit = () => Promise.all([
  checkDatabaseConnection(),
  Meetup.sync({ alter: isGenerate }),
  User.sync({ alter: isGenerate }),
  MeetupRegistration.sync({ alter: isGenerate })
]);

export default dbInit;
