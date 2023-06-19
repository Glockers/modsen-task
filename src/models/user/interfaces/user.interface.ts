export interface IUserAttributes {
  id: number;
  login: string;
  password: string;
  role: string;
}

export type IUserInput = Omit<IUserAttributes, 'id'>

export type IAuthCredentials = Omit<IUserAttributes, 'id' | 'role'>
