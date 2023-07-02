import { Response, Request } from 'express';
import { MeetupService } from './meetup.service';
import { catchAsyncFunction } from '../../common/helpers/catchAsync';
import { httpStatus } from '../../common/types';
import { TCreateMeetupDTO, TUpdateMeetupDTO } from './interfaces';
import { Inject, Service } from 'typedi';
import { extractDataFromBody, extractDataFromParams, extractDataFromQuery } from '../../common/utils/exctractorRequest';
import { FiltersMeetupRequest, MeetupIdRequest, UpdateMeetupRequest } from './interfaces/request.interface';

@Service()
export class MeetupController {
  @Inject()
  public readonly meetupService: MeetupService;

  public create = catchAsyncFunction(async (req: Request, res: Response) => {
    const validatedPayload = extractDataFromBody<TCreateMeetupDTO>(req);
    const createdMeetup = await this.meetupService.create(validatedPayload);
    res.status(httpStatus.CREATED).send({
      status: httpStatus.OK,
      data: createdMeetup
    });
  });

  public deleteById = catchAsyncFunction(async (req: Request, res: Response) => {
    const id = Number(extractDataFromParams(req));
    const deletedMeetup = await this.meetupService.deleteById(id);
    res.status(httpStatus.OK).send({
      status: httpStatus.OK,
      data: deletedMeetup
    });
  });

  public updateById = catchAsyncFunction(async (req: UpdateMeetupRequest, res: Response) => {
    const id = Number(extractDataFromParams(req));
    const validatedPayload = extractDataFromBody<TUpdateMeetupDTO>(req);
    const meetup = await this.meetupService.updateMeetup(id, validatedPayload);
    res.status(httpStatus.OK).send({
      status: httpStatus.OK,
      data: meetup
    });
  });

  public getOneById = catchAsyncFunction(async (req: MeetupIdRequest, res: Response) => {
    const id = Number(extractDataFromParams(req));
    const result = await this.meetupService.getOneById(id);
    res.status(httpStatus.OK).json({
      status: httpStatus.OK,
      data: result
    });
  });

  public getAll = catchAsyncFunction(async (req: FiltersMeetupRequest, res: Response) => {
    const params = extractDataFromQuery(req);
    const meetups = await this.meetupService.getAllMeetup(params);
    res.status(httpStatus.OK).json({
      status: httpStatus.OK,
      data: meetups
    });
  });
}
