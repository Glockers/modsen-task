import { IMeetupRegistration } from '../models/meetupRegistation';
import MeetupRegistation from '../models/meetupRegistation/entities/meetupRegistation.entity';
import PostgresDataSource from '../provider/db/postgres';
import { getMeetupById } from './meetup.repository';
import { findUserByLogin } from './user.repository';

const registrationRepository = PostgresDataSource.getRepository(MeetupRegistation);

export const signUpForMeeting = async (login: string, meetupId: number): Promise<IMeetupRegistration> => {
  const user = await findUserByLogin(login);
  const meetup = await getMeetupById(meetupId);
  if (!user || !meetup) {
    throw new Error('User or Meetup not found');
  }
  const registration = new MeetupRegistation();
  registration.user = user;
  registration.meetup = meetup;

  return registrationRepository.save(registration);
};
