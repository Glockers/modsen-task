import { Request, Response } from 'express';
import { getAllService, registerUserForMeetupService } from './meetupRegistration.service';
import { IUserJWT } from '../user';
import { catchAsyncFunction } from '../../common/helpers';

export const registerUserForMeetupController = catchAsyncFunction(async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const user: IUserJWT = req.user as IUserJWT;
  const result = await registerUserForMeetupService(user, id);
  res.status(result.status).json(result);
});

export const getAllRegisterOnMeetup = catchAsyncFunction(async (req: Request, res: Response) => {
  const result = await getAllService();
  res.status(result.status).json(result);
});
