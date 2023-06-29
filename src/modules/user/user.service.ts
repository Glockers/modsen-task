import { IUserAttributes, IUserJWT } from '..';
import { findUserByLogin } from './user.repository';
import { AppError } from '../../common/exceptions/AppError';
import { IDatabaseResponse, httpStatus } from '../../common/types';
import { USER_NOT_FOUND } from './constants/message';

export const getProfileService = async (user: IUserJWT): Promise<IDatabaseResponse<IUserAttributes>> => {
  const selectedUser = await findUserByLogin(user.login);
  if (!selectedUser) throw AppError.NotFound(USER_NOT_FOUND);
  return {
    data: selectedUser,
    status: httpStatus.OK
  };
};
