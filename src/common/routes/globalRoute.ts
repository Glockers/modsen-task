import { Router } from 'express';
import { meetupRouter } from '../../modules/meetup/meetup.router';
import { userRouter } from '../../modules/user/user.router';
import { authRouter } from '../../auth/auth.router';
import { registerMeetupRouter } from '../../modules/meetupRegistation/meetupRegistration.router';

const globalRouter = Router();

globalRouter.use('/meetup', meetupRouter);
globalRouter.use('/user', userRouter);
globalRouter.use('/auth', authRouter);
globalRouter.use('/subscribe', registerMeetupRouter);

export { globalRouter };
