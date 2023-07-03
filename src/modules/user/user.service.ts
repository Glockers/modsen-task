import { Inject, Service } from 'typedi';
import { AppError } from '../../common/exceptions/AppError';
import { USER_NOT_FOUND } from './constants/message';
import { UserRepository } from './user.repository';
import { MeetupRegistrationRepository } from '../meetupRegistation/meetupRegistration.repository';
import { IUserAttributes, IUserJWT } from './interfaces';
import { IMeetupRegistration } from '../meetupRegistation';

@Service()
export class UserService {
  @Inject()
  private readonly userRepository: UserRepository;

  @Inject()
  private readonly meetupRegistrationRepository: MeetupRegistrationRepository;

  public getProfile = async (user: IUserJWT): Promise<IUserAttributes> => {
    if (!user) throw AppError.BadRequest(USER_NOT_FOUND);
    return this.getUserByLogin(user.login);
  };

  public getUserRegistrations = async (user: IUserJWT): Promise<IMeetupRegistration[]> => {
    if (!user) throw AppError.NotFound(USER_NOT_FOUND);
    const myRegistrations = this.meetupRegistrationRepository.getMeetupRegistrationsByUser(user.login);
    return myRegistrations;
  };

  public getAllUsers = async () => {
    return this.userRepository.getAll();
  };

  public getUserByLogin = async (login: string): Promise<IUserAttributes> => {
    const selectedUser = await this.userRepository.findByLogin(login);
    if (!selectedUser) throw AppError.NotFound(USER_NOT_FOUND);
    return selectedUser;
  };

  public deleteByLogin = async (login: string): Promise<IUserAttributes> => {
    const selectedUser = await this.getUserByLogin(login);
    return this.userRepository.remove(selectedUser);
  };
}
