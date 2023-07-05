import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import { Meetup } from '../../modules/meetup/entities/meetup.entity';

export class MeetupSeeder implements Seeder {
  public async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager
  ): Promise<void> {
    const userFactory = factoryManager.get(Meetup);
    await userFactory.saveMany(5);
  }
}
