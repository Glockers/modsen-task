import { Repository } from 'typeorm';
import { PostgresDataSource } from '../../infra/db/postgres';
import { Service } from 'typedi';
import { IUserAttributes, IUserInput } from './interfaces';
import { User } from './entities/user.entity';

@Service()
export class UserRepository {
  private repository: Repository<User>;

  constructor() {
    this.repository = PostgresDataSource.getRepository(User);
  }

  public create = async (user: IUserInput): Promise<IUserAttributes> => {
    return this.repository.save(user);
  };

  public findByLogin = async (login: string): Promise<IUserAttributes | null> => {
    const selectedUser = this.repository.findOneBy({
      login
    });
    if (!selectedUser) return null;
    return selectedUser;
  };

  public getAll = async (): Promise<User[]> => {
    return this.repository.find();
  };

  public remove = async (user: IUserAttributes): Promise<IUserAttributes> => {
    return this.repository.remove(user);
  };
}
