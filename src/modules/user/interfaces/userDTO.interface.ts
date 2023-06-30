import { IUserAttributes } from './user.interface';

export interface IUserDTO extends IUserAttributes { }

export interface TCreateUserDTO extends Omit<IUserDTO, 'id' | 'role'> { };

export interface IAuthCredentialsDTO extends Omit<IUserAttributes, 'id' | 'role' | 'name'> { }
