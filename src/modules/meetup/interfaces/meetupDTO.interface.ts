import { IMeetupInput } from './meetup.interface';

export type TCreateMeetupDTO = IMeetupInput

export type TUpdateMeetupDTO = TCreateMeetupDTO

export type TFilterMeetupsDTO = {
  search?: string;
  filter?: string[];
  sortBy?: string;
  sortOrder?: 'ASC' | 'DESC';
  page?: number;
  limit?: number;
}
