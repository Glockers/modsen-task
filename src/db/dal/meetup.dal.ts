import { IDatabaseResponse } from '../interface/databaseResponse.interface';
import Meetup, { IMeetupAttributes } from '../models/Meetup';

export const createMeetup = async (payload: any): Promise<IDatabaseResponse<IMeetupAttributes>> => {
  const meetup = await Meetup.create(payload);
  return { data: meetup, status: 200 };
};

export const deleteMeetupById = async (meetupId: number): Promise<IDatabaseResponse<string>> => {
  try {
    const meetup = await Meetup.findByPk(meetupId);
    if (meetup) {
      await meetup.destroy();
      return { data: 'meetup удален!', status: 200 };
    } else {
      return { data: 'meetup не найден', status: 404 };
    }
  } catch (error) {
    console.error('Ошибка при удалении meetup:', error);
    return { data: 'meetup не найден', status: 500 };
  }
};

export const getMeetup = async (meetupId: number): Promise<IDatabaseResponse<IMeetupAttributes>> => {
  try {
    const meetup = await Meetup.findByPk(meetupId);

    if (meetup) {
      return {
        status: 200,
        data: meetup.toJSON()
      };
    } else {
      return {
        status: 404,
        data: 'Такой ID не найден'
      };
    }
  } catch (error) {
    console.error('Ошибка на сервере при поиске meetup', error);
    return {
      status: 500,
      data: 'Ошибка на сервере при поиске meetup'
    };
  }
};

export const getAllMeetup = async () => {
  return Meetup.findAll();
};
