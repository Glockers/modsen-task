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

export const updateMeetup = async (meetupId: number, payload: any) => {
  const meetup = await Meetup.findByPk(meetupId);
  if (!meetup) {
    throw new Error('meetup not found');
  }
  const updatedMeetup = await meetup.update(payload);
  return updatedMeetup;
};
