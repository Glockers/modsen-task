import { checkDatabaseConnection } from './config/db.config';
import Meetup from '../models/meetup/entities/meetup.entity';
import MeetupRegistration from '../models/meetupRegistation/entities/MeetupRegistration.entity';
import User from '../models/user/entities/User.entity';

const isGenerate = Boolean(process.env.GENERATE_TABLE);

const dbInit = () => Promise.all([
  checkDatabaseConnection(),
  Meetup.sync({ alter: isGenerate }),
  User.sync({ alter: isGenerate }),
  MeetupRegistration.sync({ alter: isGenerate })
]);

export default dbInit;
