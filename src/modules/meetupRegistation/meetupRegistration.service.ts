import { Inject, Service } from 'typedi';
import { AppError } from '../../common/exceptions';
import { IUserJWT } from '../user';
import { MeetupRegistation } from './entities/meetupRegistation.entity';
import { IMeetupRegistration } from './interfaces/meetupRegistration.interface';
import { MeetupRepository } from '../meetup/meetup.repository';
import { UserRepository } from '../user/user.repository';
import { MeetupRegistrationRepository } from './meetupRegistration.repository';

@Service()
export class MeetupRegistrationService {
  @Inject()
  public readonly meetupRepository: MeetupRepository;

  @Inject()
  private readonly userRepository: UserRepository;

  @Inject()
  private readonly meetupRegistrationRepository: MeetupRegistrationRepository;

  public getAllService = async (): Promise<Array<IMeetupRegistration>> => {
    const services = await this.meetupRegistrationRepository.getAllmeetupRegistration();
    return services;
  };

  public registerUserForMeetupService = async (user: IUserJWT, meetupId: number): Promise<IMeetupRegistration> => {
    const selectedUser = await this.userRepository.findUserByLogin(user.login);
    const meetup = await this.meetupRepository.getMeetupById(meetupId);
    if (!selectedUser || !meetup) {
      throw AppError.NotFound('meetup not found');
    }
    const registration = new MeetupRegistation();
    registration.user = selectedUser;
    registration.meetup = meetup;

    const res = await this.meetupRegistrationRepository.saveRegistationMeetup(registration);
    return res;
  };
}
