import Meetup from '../models/Meetup';

export const createMeetup = async (payload: any) => {
  return Meetup.create(payload);
};

export const deleteMeetupById = async (meetupId: number) => {
  return Meetup.findByPk(meetupId);
};

export const getMeetup = async (meetupId: number) => {
  return Meetup.findByPk(meetupId);
};

export const getAllMeetup = async () => {
  return Meetup.findAll();
};
