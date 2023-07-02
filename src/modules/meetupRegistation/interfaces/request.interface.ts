import { IMeetupAttributes } from '../../meetup/interfaces';
import { Request } from 'express';

export type MeetupIdRequest = Request<Pick<IMeetupAttributes, 'id'>>
