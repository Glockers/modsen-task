import { IDatabaseResponse } from '../../common/interfaces/databaseResponse.interface';
import { createMeetup, deleteMeetupById, getAllMeetup, getMeetupById, updateMeetup } from './meetup.repository';
import { IMeetupAttributes, IMeetupInput, TFilterMeetupsDTO } from '..';
import { AppError } from '../../common/exceptions/AppError';

export const create = async (payload: IMeetupInput): Promise<IDatabaseResponse<IMeetupAttributes>> => {
  const createdMeetup = await createMeetup(payload);
  return { data: createdMeetup, status: 201 };
};

export const deleteById = async (id: number): Promise<IDatabaseResponse<string>> => {
  await deleteMeetupById(id);
  return { data: 'meetup удален!', status: 200 };
};

export const getOneById = async (id: number): Promise<IDatabaseResponse<IMeetupAttributes>> => {
  const meetup = await getMeetupById(id);
  if (meetup) {
    return {
      status: 200,
      data: meetup
    };
  } else {
    throw AppError.NotFound('Такой meetup не найден');
  }
};

export const getAll = async (params: TFilterMeetupsDTO): Promise<IDatabaseResponse<Array<IMeetupAttributes>>> => {
  const res = await getAllMeetup(params);
  return {
    data: res,
    status: 200
  };
};

// TODO подумать как сделать лучше
export const update = async (meetupId: number, payload: IMeetupInput): Promise<IDatabaseResponse<string>> => {
  await updateMeetup(meetupId, payload);
  return {
    data: 'Пользователь обновлен',
    status: 200
  };
};
