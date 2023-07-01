import { Inject, Service } from 'typedi';
import { IUserAttributes, IUserJWT } from '..';
import { AppError } from '../../common/exceptions/AppError';
import { USER_NOT_FOUND } from './constants/message';
import { UserRepository } from './user.repository';

@Service()
export class UserService {
  @Inject()
  private userRepository: UserRepository;

  public getProfileService = async (user: IUserJWT): Promise<IUserAttributes> => {
    const selectedUser = await this.userRepository.findUserByLogin(user.login);
    if (!selectedUser) throw AppError.NotFound(USER_NOT_FOUND);
    return selectedUser;
  };
}
