import { IDatabaseResponse, httpStatus } from '../../common/types';
import { IUserJWT } from '../user';
import { IMeetupRegistration } from './interfaces/meetupRegistration.interface';
import { getAllmeetupRegistration, saveRegistationMeetup } from './meetupRegistration.repository';

export const getAllService = async (): Promise<IDatabaseResponse<Array<IMeetupRegistration>>> => {
  const res = await getAllmeetupRegistration();
  return {
    data: res,
    status: httpStatus.OK
  };
};

export const registerUserForMeetupService = async (user: IUserJWT, meetupId: number): Promise<IDatabaseResponse<IMeetupRegistration>> => {
  const res = await saveRegistationMeetup(user.login, meetupId);
  return {
    data: res,
    status: httpStatus.CREATED
  };
};
