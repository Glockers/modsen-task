import { createMeetup, deleteMeetupById, getMeetup } from '../dal/meetup.dal';

export const create = async (payload: any) => {
  return createMeetup(payload);
};

export const deleteById = async (id: number) => {
  return deleteMeetupById(id);
};

export const getOneById = async (id: number) => {
  return getMeetup(id);
};
