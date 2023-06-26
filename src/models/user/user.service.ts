import { Role } from '../../common/interfaces/role.interface';
import { IAuthCredentialsDTO, IUserAttributes, IUserInput, IUserJWT, TCreateUserDTO } from '..';
import { createUser, findUserByLogin } from './user.repository';
import { generateTokens } from '../../authentication/auth.service';
import { AppError } from '../../common/exceptions/AppError';
import { IDatabaseResponse } from '../../common';

export const signUp = async (payload: TCreateUserDTO) => {
  const selectedUser = await findUserByLogin(payload.login);
  if (selectedUser) {
    throw AppError.ConflictError('such user already exists');
  }
  const newUser: IUserInput = {
    login: payload.login,
    password: payload.password,
    role: Role.USER
  };
  await createUser(newUser);
  return { data: 'Registration completed successfully', status: 200 };
};

export const logIn = async (payload: IAuthCredentialsDTO) => {
  const selectedUser = await findUserByLogin(payload.login);
  if (!selectedUser || selectedUser.password !== payload.password) {
    throw AppError.Unauthorized('Invalid login or password');
  }
  const userJWT: IUserJWT = {
    login: payload.login,
    role: selectedUser.role
  };
  const tokens = generateTokens(userJWT);

  return { data: tokens, status: 204 };
};

export const getProfileService = async (user: IUserJWT): Promise<IDatabaseResponse<IUserAttributes>> => {
  const selectedUser = await findUserByLogin(user.login);
  if (!selectedUser) throw AppError.NotFound('user not found');
  return {
    data: selectedUser,
    status: 200
  };
};
