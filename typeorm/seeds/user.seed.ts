import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { User } from '../../src/modules/user/entities/user.entity';
import { DataSource } from 'typeorm';

export class UserSeeder implements Seeder {
  public async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager
  ): Promise<void> {
    const userFactory = factoryManager.get(User);
    await userFactory.saveMany(5);
  }
}
