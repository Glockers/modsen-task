import { Role } from '../common/interfaces/role.interface';
import { IAuthCredentialsDTO, IUserInput, IUserJWT, TCreateUserDTO } from '../models';
import { createUser, findUserByLogin } from '../repository/user.repository';
import { generateTokens } from './sesssion.service';

export const signUp = async (payload: TCreateUserDTO) => {
  try {
    const selectedUser = await findUserByLogin(payload.login);
    if (selectedUser) {
      return { data: 'such user already exists', status: 409 };
    }
    const newUser: IUserInput = {
      login: payload.login,
      password: payload.password,
      role: Role.USER
    };
    await createUser(newUser);
    return { data: 'Registration completed successfully', status: 200 };
  } catch (e) {
    throw new Error('Error with create new meetup');
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
    return { data: 'Error with create new meetup', status: 500 };
  }
};
