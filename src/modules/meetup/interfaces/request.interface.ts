import { Request } from 'express';
import { TFilterMeetupsDTO, TUpdateMeetupDTO } from './meetupDTO.interface';
import { IMeetupAttributes } from './meetup.interface';
import { ParamsRequestType, QueryRequestType } from '../../../common/utils';

type MeetupID = Pick<IMeetupAttributes, 'id'>;

export type MeetupIdRequest = ParamsRequestType<MeetupID>
export type UpdateMeetupRequest = Request<MeetupID, {}, TUpdateMeetupDTO>
export type FiltersMeetupRequest = QueryRequestType<TFilterMeetupsDTO>
