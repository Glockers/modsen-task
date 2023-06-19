import { IUserAttributes } from './user.interface';

export interface IUserDTO extends IUserAttributes { }

export type TCreateUserDTO = Omit<IUserDTO, 'id' | 'role'>;
