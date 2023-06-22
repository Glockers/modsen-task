import { Role } from '../../common/interfaces/role.interface';
import { IAuthCredentialsDTO, IUserInput, IUserJWT, TCreateUserDTO } from '..';
import { createUser, findUserByLogin } from './user.repository';
import { generateTokens } from '../../authentication/sesssion.service';
import { AppError } from '../../common/exceptions/AppError';

export const signUp = async (payload: TCreateUserDTO) => {
  try {
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
  } catch (e) {
    throw AppError.InternalServerError('Error with create new meetup');
  }
};

export const logIn = async (payload: IAuthCredentialsDTO) => {
  try {
    const selectedUser = await findUserByLogin(payload.login);
    if (!selectedUser || selectedUser.password !== payload.password) {
      return { data: 'Invalid login or password ', status: 401 };
    }
    const userJWT: IUserJWT = {
      login: payload.login,
      role: selectedUser.role
    };
    const tokens = generateTokens(userJWT);

    return { data: tokens, status: 204 };
  } catch (e) {
    throw AppError.InternalServerError('Error with meetup');
  }
};
