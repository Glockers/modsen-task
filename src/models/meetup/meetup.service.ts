import { IDatabaseResponse } from '../../common/interfaces/databaseResponse.interface';
import { createMeetup, deleteMeetupById, getAllMeetup, getMeetupById, updateMeetup } from './meetup.repository';
import { IMeetupAttributes, IMeetupInput, TFilterMeetupsDTO } from '..';

export const create = async (payload: IMeetupInput): Promise<IDatabaseResponse<IMeetupAttributes>> => {
  try {
    const createdMeetup = await createMeetup(payload);
    return { data: createdMeetup, status: 200 };
  } catch (e) {
    return { data: 'Error with create new meetup', status: 500 };
  }
};

export const deleteById = async (id: number): Promise<IDatabaseResponse<string>> => {
  try {
    await deleteMeetupById(id);
    return { data: 'meetup удален!', status: 200 };
  } catch (error) {
    console.error('Ошибка при удалении meetup:', error); // TODO REMOVE
    return { data: 'meetup не найден', status: 500 };
  }
};

export const getOneById = async (id: number): Promise<IDatabaseResponse<IMeetupAttributes>> => {
  try {
    const meetup = await getMeetupById(id);
    if (meetup) {
      return {
        status: 200,
        data: meetup
      };
    } else {
      return {
        status: 404,
        data: 'Такой ID не найден'
      };
    }
  } catch (error) {
    console.error('Ошибка на сервере при поиске meetup', error); // TODO REMOVE
    return {
      status: 500,
      data: 'Ошибка на сервере при поиске meetup'
    };
  }
};

export const getAll = async (params: TFilterMeetupsDTO): Promise<IDatabaseResponse<any>> => {
  try {
    const res = await getAllMeetup(params);
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

// TODO
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
