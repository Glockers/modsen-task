import jwt from 'jsonwebtoken';
import { Role } from '../common/types';
import { AppError } from '../common/exceptions';
import { jwtConfig } from '../config';
import { VerifiedCallback } from 'passport-jwt';
import { ITokenPair } from './interfaces/token.inteface';
import { EAuthMessageError } from '../common/types/authMessageError';
import { Inject, Service } from 'typedi';
import { UserRepository } from '../modules/user/user.repository';
import { IAuthCredentialsDTO, IUserAttributes, IUserInput, IUserJWT, TCreateUserDTO } from '../modules/user/interfaces';

@Service()
export class AuthService {
  @Inject()
  private userRepository: UserRepository;

  public signUp = async (payload: TCreateUserDTO): Promise<IUserAttributes> => {
    const selectedUser = await this.userRepository.findByLogin(payload.login);
    if (selectedUser) {
      throw AppError.ConflictError('such user already exists');
    }
    const newUser: IUserInput = {
      name: payload.name,
      login: payload.login,
      password: payload.password,
      role: Role.USER
    };

    return this.userRepository.create(newUser);
  };

  public logIn = async (payload: IAuthCredentialsDTO): Promise<ITokenPair> => {
    const selectedUser = await this.userRepository.findByLogin(payload.login);
    if (!selectedUser || selectedUser.password !== payload.password) {
      throw AppError.Unauthorized('Invalid login or password');
    }
    const userJWT: IUserJWT = {
      login: payload.login,
      role: selectedUser.role
    };
    const tokens = this.generateTokens(userJWT);

    return tokens;
  };

  private generateTokens<T extends Object>(object: T): ITokenPair {
    const accessToken = jwt.sign(object, jwtConfig.JWT_ACCESS_SECRET, { expiresIn: jwtConfig.ACCESS_TOKEN_EXPIRATION });
    const refreshToken = jwt.sign(object, jwtConfig.JWT_REFRESH_SECRET, { expiresIn: jwtConfig.REFRESH_TOKEN_EXPIRATION });
    return { accessToken, refreshToken };
  }

  public validateJWTToken = (payload: IAuthCredentialsDTO, done: VerifiedCallback): void => {
    if (this.userRepository.findByLogin(payload.login)) {
      done(null, payload);
    } else {
      done(EAuthMessageError.UNAUTHORIZED, false);
    }
  };

  public verifyJWTToken(token: string, type: 'access' | 'refresh'): IUserJWT | null {
    try {
      const data = jwt.verify(token, type === 'access' ? jwtConfig.JWT_ACCESS_SECRET : jwtConfig.JWT_REFRESH_SECRET) as IUserJWT;
      return data;
    } catch (e) {
      return null;
    }
  }
}
