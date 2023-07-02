import { Service } from 'typedi';
import { IMeetupRegistration } from '.';
import { MeetupRegistation } from './entities/meetupRegistation.entity';
import { PostgresDataSource } from '../../infra/db/postgres';
import { Repository } from 'typeorm';

@Service()
export class MeetupRegistrationRepository {
  private repository: Repository<MeetupRegistation>;

  constructor() {
    this.repository = PostgresDataSource.getRepository(MeetupRegistation);
  }

  public saveRegistationMeetup = async (registration: MeetupRegistation): Promise<IMeetupRegistration> => {
    return this.repository.save(registration);
  };

  public getMeetupRegistrationsByUser = async (userLogin: string): Promise<Array<IMeetupRegistration>> => {
    return this.repository.find({
      where: {
        user: {
          login: userLogin
        }
      },
      relations: {
        meetup: true
      }
    });
  };

  public getAllmeetupRegistration = async (): Promise<Array<IMeetupRegistration>> => {
    return this.repository.find({
      select: {
        user: {
          id: true,
          login: true
        }
      },
      relations: {
        meetup: true,
        user: true
      }
    });
  };
}
