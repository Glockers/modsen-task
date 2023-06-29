import { Response, Request } from 'express';
import { meetupService } from './meetup.service';
import { TValidatePayload } from '../../common/utils/validateDTO';
import { catchAsyncFunction } from '../../common/helpers/catchAsync';
import { httpStatus } from '../../common/types';
import { TCreateMeetupDTO, TFilterMeetupsDTO, TUpdateMeetupDTO } from './interfaces';

class MeetupController {
  public create = catchAsyncFunction(async (req: TValidatePayload<TCreateMeetupDTO>, res: Response) => {
    const validatedPayload = req.validatedPayload;
    const createdMeetup = await meetupService.create(validatedPayload);
    res.status(httpStatus.CREATED).send({
      status: httpStatus.OK,
      data: createdMeetup
    });
  });

  public deleteById = catchAsyncFunction(async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const deletedMeetup = await meetupService.deleteById(id);
    res.status(httpStatus.OK).send({
      status: httpStatus.OK,
      data: deletedMeetup
    });
  });

  public updateById = catchAsyncFunction(async (req: TValidatePayload<TUpdateMeetupDTO>, res: Response) => {
    const id = Number(req.params.id);
    const validatedPayload = req.validatedPayload;
    const meetup = await meetupService.updateMeetup(id, validatedPayload);
    res.status(httpStatus.OK).send({
      status: httpStatus.OK,
      data: meetup
    });
  });

  public getOneById = catchAsyncFunction(async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const result = await meetupService.getOneById(id);
    res.status(httpStatus.OK).json({
      status: httpStatus.OK,
      data: result
    });
  });

  public getAll = catchAsyncFunction(async (req: Request, res: Response) => {
    const params: TFilterMeetupsDTO = req.query;
    const meetups = await meetupService.getAllMeetup(params);
    res.status(httpStatus.OK).json({
      status: httpStatus.OK,
      data: meetups
    });
  });
}

export const meetupControoler = new MeetupController();
