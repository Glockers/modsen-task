import { IUserAttributes, IUserJWT } from '..';
import { findUserByLogin } from './user.repository';
import { AppError } from '../../common/exceptions/AppError';
import { IDatabaseResponse } from '../../common/interfaces';

export const getProfileService = async (user: IUserJWT): Promise<IDatabaseResponse<IUserAttributes>> => {
  const selectedUser = await findUserByLogin(user.login);
  if (!selectedUser) throw AppError.NotFound('user not found');
  return {
    data: selectedUser,
    status: 200
  };
};
