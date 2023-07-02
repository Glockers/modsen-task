import { Request, Response } from 'express';
import { catchAsyncFunction } from '../../common/helpers';
import { httpStatus } from '../../common/types';
import { Inject, Service } from 'typedi';
import { MeetupRegistrationService } from './meetupRegistration.service';
import { AuthService, extractTokenFromCookies } from '../../auth';
import { JwtStrategyType } from '../../common/types/strategy.enum';
import { IUserJWT } from '../user/interfaces';
import { MeetupIdRequest } from './interfaces/request.interface';
import { extractDataFromParams } from '../../common/utils/exctractorRequest';

@Service()
export class MeetupRegistrationController {
  @Inject()
  public readonly meetupRegistrationService: MeetupRegistrationService;

  @Inject()
  public readonly authService: AuthService;

  public registerUserOnMeetup = catchAsyncFunction(async (req: MeetupIdRequest, res: Response) => {
    const { id } = extractDataFromParams(req);
    const user: IUserJWT = this.authService.verifyJWTToken(extractTokenFromCookies(req, JwtStrategyType.ACCESS_JWT_STRATEGY), 'access');
    const result = await this.meetupRegistrationService.registerUserOnMeetup(user, id);
    res.status(httpStatus.CREATED).json({
      status: httpStatus.CREATED,
      data: result
    });
  });

  public getRegistrationsOnMeetup = catchAsyncFunction(async (req: Request, res: Response) => {
    const result = await this.meetupRegistrationService.getAllRegistrations();
    res.status(httpStatus.OK).json({
      status: httpStatus.OK,
      data: result
    });
  });
}
