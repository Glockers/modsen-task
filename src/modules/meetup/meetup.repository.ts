import { PostgresDataSource } from '../../providers/db/postgres';
import { Like, Repository } from 'typeorm';
import { Meetup } from './entities/meetup.entity';
import { IMeetupAttributes, IMeetupInput, TFilterMeetupsDTO } from './interfaces';
import { Service } from 'typedi';

@Service()
export class MeetupRepository {
  private repository: Repository<Meetup>;

  constructor() {
    this.repository = PostgresDataSource.getRepository(Meetup);
  }

  public async create(payload: IMeetupInput): Promise<IMeetupAttributes> {
    return this.repository.save(payload);
  };

  public async deleteMeetupById(meetup: Meetup): Promise<IMeetupAttributes> {
    return this.repository.remove(meetup);
  };

  public async getMeetupById(meetupId: number): Promise<any> {
    const meetup = await this.repository.findOneBy({
      id: meetupId
    });

    return meetup;
  };

  public async updateMeetup(oldMeetup: Meetup, newMeetup: IMeetupInput) {
    const updatedMeetup: Meetup = {
      ...oldMeetup,
      ...newMeetup
    };
    return this.repository.save(updatedMeetup);
  };

  public async getAllMeetup(params: TFilterMeetupsDTO): Promise<Array<IMeetupAttributes>> {
    const queryOptions: any = {};

    if (params.filter) {
      queryOptions.where = {
        tags: {
          $contains: [params.filter]
        }
      };
    }

    if (params.sortBy && params.sortOrder) {
      queryOptions.order = {
        [params.sortBy]: params.sortOrder
      };
    }

    if (params.limit && params.page) {
      queryOptions.skip = (params.page - 1) * params.limit;
      queryOptions.take = params.limit;
    }

    if (params.search) {
      queryOptions.where = {
        ...queryOptions.where,
        title: Like(`%${params.search}%`)
      };
    }

    return this.repository.find(queryOptions);
  };
}
