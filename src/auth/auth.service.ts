import jwt from 'jsonwebtoken';
import { IAuthCredentialsDTO, IUserInput, IUserJWT, TCreateUserDTO } from '../models';
import { jwtConfig } from '../config/jwt.config';
import { AppError } from '../common/exceptions/AppError';
import { createUser, findUserByLogin } from '../models/user/user.repository';
import { Role } from '../common/interfaces';

export const signUp = async (payload: TCreateUserDTO) => {
  const selectedUser = await findUserByLogin(payload.login);
  if (selectedUser) {
    throw AppError.ConflictError('such user already exists');
  }
  const newUser: IUserInput = {
    name: payload.name,
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

export function generateTokens<T extends Object>(object: T) {
  const accessToken = jwt.sign(object, jwtConfig.JWT_ACCESS_SECRET, { expiresIn: jwtConfig.ACCESS_TOKEN_EXPIRATION });
  const refreshToken = jwt.sign(object, jwtConfig.JWT_REFRESH_SECRET, { expiresIn: jwtConfig.REFRESH_TOKEN_EXPIRATION });
  return { accessToken, refreshToken };
}

export function validateJWTToken(token: string, type: 'access' | 'refresh'): IUserJWT | null {
  try {
    const data = jwt.verify(token, type === 'access' ? jwtConfig.JWT_ACCESS_SECRET : jwtConfig.JWT_REFRESH_SECRET) as IUserJWT;
    return data;
  } catch (e) {
    return null;
  }
}
