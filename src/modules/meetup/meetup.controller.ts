import { Response, Request } from 'express';
import { MeetupService } from './meetup.service';
import { TValidatePayload } from '../../common/utils/validateDTO';
import { catchAsyncFunction } from '../../common/helpers/catchAsync';
import { httpStatus } from '../../common/types';
import { TCreateMeetupDTO, TFilterMeetupsDTO, TUpdateMeetupDTO } from './interfaces';
import { Inject, Service } from 'typedi';

@Service()
export class MeetupController {
  // eslint-disable-next-line no-useless-constructor
  constructor(
    @Inject()
    public meetupService: MeetupService
  ) { }

  public create = catchAsyncFunction(async (req: TValidatePayload<TCreateMeetupDTO>, res: Response) => {
    const validatedPayload = req.validatedPayload;
    const createdMeetup = await this.meetupService.create(validatedPayload);
    res.status(httpStatus.CREATED).send({
      status: httpStatus.OK,
      data: createdMeetup
    });
  });

  public deleteById = catchAsyncFunction(async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const deletedMeetup = await this.meetupService.deleteById(id);
    res.status(httpStatus.OK).send({
      status: httpStatus.OK,
      data: deletedMeetup
    });
  });

  public updateById = catchAsyncFunction(async (req: TValidatePayload<TUpdateMeetupDTO>, res: Response) => {
    const id = Number(req.params.id);
    const validatedPayload = req.validatedPayload;
    const meetup = await this.meetupService.updateMeetup(id, validatedPayload);
    res.status(httpStatus.OK).send({
      status: httpStatus.OK,
      data: meetup
    });
  });

  public getOneById = catchAsyncFunction(async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const result = await this.meetupService.getOneById(id);
    res.status(httpStatus.OK).json({
      status: httpStatus.OK,
      data: result
    });
  });

  public getAll = catchAsyncFunction(async (req: Request, res: Response) => {
    const params: TFilterMeetupsDTO = req.query;
    const meetups = await this.meetupService.getAllMeetup(params);
    res.status(httpStatus.OK).json({
      status: httpStatus.OK,
      data: meetups
    });
  });
}

// export const meetupControoler = new MeetupController();
