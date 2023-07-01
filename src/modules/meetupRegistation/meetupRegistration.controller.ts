import { Request, Response } from 'express';
import { IUserJWT } from '../user';
import { catchAsyncFunction } from '../../common/helpers';
import { httpStatus } from '../../common/types';
import { Inject, Service } from 'typedi';
import { MeetupRegistrationService } from './meetupRegistration.service';
import { AuthService, extractTokenFromCookies } from '../../auth';
import { JwtStrategyType } from '../../common/types/strategy.enum';

@Service()
export class MeetupRegistrationController {
  @Inject()
  public readonly meetupRegistrationService: MeetupRegistrationService;

  @Inject()
  public readonly authService: AuthService;

  public registerUserForMeetupController = catchAsyncFunction(async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const user: IUserJWT = this.authService.verifyJWTToken(extractTokenFromCookies(req, JwtStrategyType.ACCESS_JWT_STRATEGY), 'access');
    const result = await this.meetupRegistrationService.registerUserForMeetupService(user, id);
    res.status(httpStatus.CREATED).json({
      status: httpStatus.CREATED,
      data: result
    });
  });

  public getAllRegisterOnMeetup = catchAsyncFunction(async (req: Request, res: Response) => {
    const result = await this.meetupRegistrationService.getAllService();
    res.status(httpStatus.OK).json({
      status: httpStatus.OK,
      data: result
    });
  });
}
