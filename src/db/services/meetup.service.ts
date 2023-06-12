import { createMeetup, deleteMeetupById, getAllMeetup, getMeetup, updateMeetup } from '../dal/meetup.dal';
import { IDatabaseResponse } from '../interface/databaseResponse.interface';
import { IMeetupAttributes } from '../models';

export const create = async (payload: any): Promise<IDatabaseResponse<IMeetupAttributes>> => {
  try {
    const createdMeetup = await createMeetup(payload);
    return { data: createdMeetup, status: 200 };
  } catch (e) {
    return { data: 'Error with create new meetup', status: 500 };
  }
};

export const deleteById = async (id: number): Promise<IDatabaseResponse<string>> => {
  try {
    const selecteMeetup = await deleteMeetupById(id);
    if (selecteMeetup) {
      await selecteMeetup.destroy();
      return { data: 'meetup удален!', status: 200 };
    } else {
      return { data: 'meetup не найден', status: 404 };
    }
  } catch (error) {
    console.error('Ошибка при удалении meetup:', error);
    return { data: 'meetup не найден', status: 500 };
  }
};

export const getOneById = async (id: number): Promise<IDatabaseResponse<IMeetupAttributes>> => {
  try {
    const meetup = await getMeetup(id);
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

export const update = async (meetupId: number, payload: any): Promise<IDatabaseResponse<string>> => {
  try {
    await updateMeetup(meetupId, payload);
    return {
      data: 'Пользователь обновлен',
      status: 200
    };
  } catch (ex) {
    return {
      data: 'Пользователь с таким ID не найден',
      status: 404
    };
  }
};
