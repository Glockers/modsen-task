import { IUserAttributes, IUserInput, User } from '..';
import { PostgresDataSource } from '../../provider/db/postgres';

const userRepositry = PostgresDataSource.getRepository(User);

export const createUser = async (user: IUserInput): Promise<IUserInput> => {
  return userRepositry.save(user);
};

export const findUserByLogin = async (login: string): Promise<IUserAttributes | null> => {
  const selectedUser = userRepositry.findOneBy({
    login
  });

  if (!selectedUser) return null;

  return selectedUser;
};
