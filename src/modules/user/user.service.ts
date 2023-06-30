import { IUserAttributes, IUserJWT } from '..';
import { AppError } from '../../common/exceptions/AppError';
import { USER_NOT_FOUND } from './constants/message';
import { userRepository } from './user.repository';

class UserService {
  // TODO
  public getProfileService = async (user: IUserJWT): Promise<IUserAttributes> => {
    console.log('user? ', user);
    const selectedUser = await userRepository.findUserByLogin(user.login);
    if (!selectedUser) throw AppError.NotFound(USER_NOT_FOUND);
    return selectedUser;
  };
}

export const userService = new UserService();
