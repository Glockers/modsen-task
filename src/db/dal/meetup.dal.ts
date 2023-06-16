import { Op } from 'sequelize';
import Meetup from '../../models/meetup/entities/meetup.entity';
import { TFilterMeetupsDTO } from '../../api/dto/meetup.dto';

export const createMeetup = async (payload: any) => {
  return Meetup.create(payload);
};

export const deleteMeetupById = async (meetupId: number) => {
  return Meetup.findByPk(meetupId);
};

export const getMeetup = async (meetupId: number) => {
  return Meetup.findByPk(meetupId);
};

export const getAllMeetup = async (params: TFilterMeetupsDTO) => {
  const queryOptions: any = {};

  if (params.filter) {
    queryOptions.where = {
      ...queryOptions,
      tags: {
        [Op.contains]: [params.filter]
      }
    };
  }

  if (params.sortBy && params.sortOrder) {
    queryOptions.order = [[params.sortBy, params.sortOrder]];
  }

  if (params.limit && params.page) {
    queryOptions.offset = (params.page - 1) * params.limit;
    queryOptions.limit = params.limit;
  }

  if (params.search) {
    queryOptions.where = {
      ...queryOptions,
      title: {
        [Op.like]: `%${params.search}%`
      }
    };
  }

  return Meetup.findAll(
    queryOptions
  );
};

export const updateMeetup = async (meetupId: number, payload: any) => {
  const meetup = await Meetup.findByPk(meetupId);
  if (!meetup) {
    throw new Error('meetup not found');
  }
  const updatedMeetup = await meetup.update(payload);
  return updatedMeetup;
};
