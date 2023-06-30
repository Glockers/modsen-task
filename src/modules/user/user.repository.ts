import { Repository } from 'typeorm';
import { IUserAttributes, IUserInput, User } from '..';
import { PostgresDataSource } from '../../infra/db/postgres';

class UserRepository {
  private repository: Repository<User>;

  constructor() {
    this.repository = PostgresDataSource.getRepository(User);
  }

  public createUser = async (user: IUserInput): Promise<IUserAttributes> => {
    return this.repository.save(user);
  };

  public findUserByLogin = async (login: string): Promise<IUserAttributes | null> => {
    const selectedUser = this.repository.findOneBy({
      login
    });

    if (!selectedUser) return null;

    return selectedUser;
  };
}

export const userRepository = new UserRepository();
