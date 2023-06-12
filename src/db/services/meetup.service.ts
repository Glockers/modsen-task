import { createMeetup, deleteMeetupById, getAllMeetup, getMeetup } from '../dal/meetup.dal';
import { IDatabaseResponse } from '../interface/databaseResponse.interface';

export const create = async (payload: any) => {
  return createMeetup(payload);
};

export const deleteById = async (id: number) => {
  return deleteMeetupById(id);
};

export const getOneById = async (id: number) => {
  return getMeetup(id);
};

export const getAll = async (): Promise<IDatabaseResponse<any>> => {
  try {
    const res = await getAllMeetup();
    return {
      data: res,
      status: 200
    };
  } catch (ex) {
    return {
      data: 'Exception on server',
      status: 500
    };
  }
};
