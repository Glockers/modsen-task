import { Role } from '../../../common/interfaces/role.interface';

export interface IUserAttributes {
  id: number;
  name: string;
  login: string;
  password: string;
  role: Role;
}

export interface IUserInput extends Omit<IUserAttributes, 'id'> { }

export interface IUserJWT extends Omit<IUserAttributes, 'password' | 'id' | 'name'> { }
