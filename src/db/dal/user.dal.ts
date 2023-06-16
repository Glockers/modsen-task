import { Role } from '../interface/role';
import User, { IAuthCredentials, IUserAttributes, IUserInput } from '../../models/user/entities/User.entity';

export const createUser = async (user: IUserInput) => {
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
