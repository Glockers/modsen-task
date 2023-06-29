import { Request, Response } from 'express';
import { IUserJWT } from '../user';
import { catchAsyncFunction } from '../../common/helpers';
import { httpStatus } from '../../common/types';
import { meetupRegistrationService } from './meetupRegistration.service';

class MeetupRegistrationController {
  public registerUserForMeetupController = catchAsyncFunction(async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const user: IUserJWT = req.user as IUserJWT;
    const result = await meetupRegistrationService.registerUserForMeetupService(user, id);
    res.status(result.status).json(result);
  });

  public getAllRegisterOnMeetup = catchAsyncFunction(async (req: Request, res: Response) => {
    const result = await meetupRegistrationService.getAllService();
    res.status(httpStatus.OK).json({
      status: httpStatus.OK,
      data: result
    });
  });
}

export const meetupRegistrationController = new MeetupRegistrationController();
