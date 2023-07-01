import { Inject, Service } from 'typedi';
import { AppError } from '../../common/exceptions/AppError';
import { MEETUP_NOT_FOUND_MESSAGE } from './constants/message.constant';
import { Meetup } from './entities/meetup.entity';
import { IMeetupAttributes, IMeetupInput, TFilterMeetupsDTO } from './interfaces';
import { MeetupRepository } from './meetup.repository';

@Service()
export class MeetupService {
  @Inject()
  public meetupRepository: MeetupRepository;

  public async create(payload: IMeetupInput): Promise<IMeetupAttributes> {
    const createdMeetup = await this.meetupRepository.create(payload);
    return createdMeetup;
  };

  public async deleteById(id: number): Promise<IMeetupAttributes> {
    const meetup = await this.getOneById(id);
    await this.meetupRepository.deleteMeetupById(meetup);
    return meetup;
  };

  public async getOneById(id: number): Promise<Meetup> {
    const meetup = await this.meetupRepository.getMeetupById(id);
    if (!meetup) {
      throw AppError.NotFound(MEETUP_NOT_FOUND_MESSAGE);
    }
    return meetup;
  };

  public async getAllMeetup(params: TFilterMeetupsDTO): Promise<Array<IMeetupAttributes>> {
    const meetups = await this.meetupRepository.getAllMeetup(params);
    return meetups;
  };

  public async updateMeetup(meetupId: number, newMeetup: IMeetupInput): Promise<IMeetupAttributes> {
    const meetup = await this.getOneById(meetupId);
    const updatedMeetup = await this.meetupRepository.updateMeetup(meetup, newMeetup);
    return updatedMeetup;
  };
}
