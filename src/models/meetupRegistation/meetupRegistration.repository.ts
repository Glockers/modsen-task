import { IMeetupRegistration } from '.';
import MeetupRegistation from './entities/meetupRegistation.entity';
import PostgresDataSource from '../../provider/db/postgres';
import { getMeetupById } from '../meetup/meetup.repository';
import { findUserByLogin } from '../user/user.repository';
import { AppError } from '../../common/exceptions/AppError';

const registrationRepository = PostgresDataSource.getRepository(MeetupRegistation);

export const saveRegistationMeetup = async (login: string, meetupId: number): Promise<IMeetupRegistration> => {
  const user = await findUserByLogin(login);
  const meetup = await getMeetupById(meetupId);
  if (!user || !meetup) {
    throw AppError.NotFound('meetup not found');
  }
  const registration = new MeetupRegistation();
  registration.user = user;
  registration.meetup = meetup;

  return registrationRepository.save(registration);
};

export const getAllmeetupRegistration = async (): Promise<Array<IMeetupRegistration>> => {
  return registrationRepository.find({
    select: {
      user: {
        id: true,
        login: true
      }
    },
    relations: {
      meetup: true,
      user: true
    }
  });
};
