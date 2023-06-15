import { Role } from '../interface/role';
import User, { IAuthCredentials, IUserAttributes, IUserCreate } from '../models/User';

export const createUser = async (user: IUserCreate) => {
  User.beforeCreate(
    async (user) => {
      user.role = Role.USER;
    }
  );
  return User.create(user);
};

export const authenticateUser = async (user: IAuthCredentials): Promise<IUserAttributes | null> => {
  return User.findOne({ where: { login: user.login } });
};
