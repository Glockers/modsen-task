import { IMeetupAttributes, IMeetupInput, Meetup, TFilterMeetupsDTO } from '../models';
import PostgresDataSource from '../provider/db/postgres';
import { Like } from 'typeorm';

const meetupRepository = PostgresDataSource.getRepository(Meetup);

export const createMeetup = async (payload: IMeetupInput): Promise<IMeetupAttributes> => {
  return meetupRepository.save(payload);
};

export const deleteMeetupById = async (meetupId: number): Promise<IMeetupAttributes> => {
  const meetup = await meetupRepository.findOneBy({
    id: meetupId
  });

  if (!meetup) {
    throw new Error('Meetup not found');
  }

  return await meetupRepository.remove(meetup);
};

export const getMeetupById = async (meetupId: number): Promise<IMeetupAttributes> => {
  const meetup = await meetupRepository.findOneBy({
    id: meetupId
  });

  if (!meetup) {
    throw new Error('Meetup not found');
  }

  return meetup;
};

export const updateMeetup = async (meetupId: number, payload: IMeetupInput) => {
  const selectedMeetup = await meetupRepository.findOneBy({
    id: meetupId
  });

  if (!selectedMeetup) {
    throw new Error('meetup not found');
  }

  const updatedMeetup = await meetupRepository.save(payload);
  return updatedMeetup;
};

export const getAllMeetup = async (params: TFilterMeetupsDTO) => {
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

  return meetupRepository.find(queryOptions);
};
