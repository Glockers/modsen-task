import Meetup from '../models/Meetup';

export const createMeetup = async (payload: any): Promise<any> => {
  const meetup = await Meetup.create(payload);
  return meetup;
};
