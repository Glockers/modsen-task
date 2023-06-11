import { createMeetup } from '../dal/meetup.dal';

export const create = async (payload: any) => {
  return createMeetup(payload);
};
