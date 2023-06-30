import { AppError } from '../../common/exceptions';
import { IDatabaseResponse, httpStatus } from '../../common/types';
import { meetupRepository } from '../meetup/meetup.repository';
import { IUserJWT } from '../user';
import { userRepository } from '../user/user.repository';
import { MeetupRegistation } from './entities/meetupRegistation.entity';
import { IMeetupRegistration } from './interfaces/meetupRegistration.interface';
import { meetupRegistrationRepository } from './meetupRegistration.repository';

class MeetupRegistrationService {
  public getAllService = async (): Promise<IDatabaseResponse<Array<IMeetupRegistration>>> => {
    const res = await meetupRegistrationRepository.getAllmeetupRegistration();
    return {
      data: res,
      status: httpStatus.OK
    };
  };

  public registerUserForMeetupService = async (user: IUserJWT, meetupId: number): Promise<IDatabaseResponse<IMeetupRegistration>> => {
    const selectedUser = await userRepository.findUserByLogin(user.login);
    const meetup = await meetupRepository.getMeetupById(meetupId);
    if (!selectedUser || !meetup) {
      throw AppError.NotFound('meetup not found');
    }
    const registration = new MeetupRegistation();
    registration.user = selectedUser;
    registration.meetup = meetup;

    const res = await meetupRegistrationRepository.saveRegistationMeetup(registration);
    return {
      data: res,
      status: httpStatus.CREATED
    };
  };
}

export const meetupRegistrationService = new MeetupRegistrationService();
