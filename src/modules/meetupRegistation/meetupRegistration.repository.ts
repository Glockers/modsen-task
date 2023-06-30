import { IMeetupRegistration } from '.';
import { MeetupRegistation } from './entities/meetupRegistation.entity';
import { PostgresDataSource } from '../../infra/db/postgres';
import { Repository } from 'typeorm';

class MeetupRegistrationRepository {
  private repository: Repository<MeetupRegistation>;

  constructor() {
    this.repository = PostgresDataSource.getRepository(MeetupRegistation);
  }

  public saveRegistationMeetup = async (registration: MeetupRegistation): Promise<IMeetupRegistration> => {
    return this.repository.save(registration);
  };

  // public const getRegistrationById = async (): Promise<IMeetupRegistration> => {

  // };

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

export const meetupRegistrationRepository = new MeetupRegistrationRepository();
