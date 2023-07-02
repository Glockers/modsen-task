import { Request } from 'express';
import { IUserAttributes } from './user.interface';

export type LoginUserRequest = Request<Pick<IUserAttributes, 'login'>>
