import { Inject, Service } from 'typedi';
import { AppError } from '../../common/exceptions';
import { MeetupRegistation } from './entities/meetupRegistation.entity';
import { IMeetupRegistration } from './interfaces/meetupRegistration.interface';
import { MeetupRepository } from '../meetup/meetup.repository';
import { UserRepository } from '../user/user.repository';
import { MeetupRegistrationRepository } from './meetupRegistration.repository';
import { IUserJWT } from '../user/interfaces';
import { ERROR_ALREADY_REGISTERED } from './constants/message';
import { MEETUP_NOT_FOUND_MESSAGE } from '../meetup/constants/message.constant';

@Service()
export class MeetupRegistrationService {
  @Inject()
  public readonly meetupRepository: MeetupRepository;

  @Inject()
  private readonly userRepository: UserRepository;

  @Inject()
  private readonly meetupRegistrationRepository: MeetupRegistrationRepository;

  public getAllRegistrations = async (): Promise<Array<IMeetupRegistration>> => {
    const services = await this.meetupRegistrationRepository.getAllmeetupRegistration();
    return services;
  };

  private hasRegisteredMeetup(userMeetups: IMeetupRegistration[], meetupId: number): boolean {
    return userMeetups.some((element) => element.meetup.id === meetupId);
  }

  public registerUserOnMeetup = async (user: IUserJWT, meetupId: number): Promise<IMeetupRegistration> => {
    const selectedUser = await this.userRepository.findByLogin(user.login);
    const meetup = await this.meetupRepository.getMeetupById(meetupId);
    if (!selectedUser || !meetup) {
      throw AppError.NotFound(MEETUP_NOT_FOUND_MESSAGE);
    }
    const userMeetups = await this.meetupRegistrationRepository.getMeetupRegistrationsByUser(user.login);

    if (this.hasRegisteredMeetup(userMeetups, meetupId)) throw AppError.ConflictError(ERROR_ALREADY_REGISTERED);

    const registration = new MeetupRegistation();
    registration.user = selectedUser;
    registration.meetup = meetup;

    const res = await this.meetupRegistrationRepository.saveRegistationMeetup(registration);
    return res;
  };
}
