import { Router } from 'express';
import { meetupRouter } from '../../models/meetup/meetup.router';
import { userRouter } from '../../models/user/user.router';
import { authRouter } from '../../auth/auth.router';
import { registerMeetupRouter } from '../../models/meetupRegistation/meetupRegistration.router';

const globalRouter = Router();

globalRouter.use('/meetup', meetupRouter);
globalRouter.use('/user', userRouter);
globalRouter.use('/auth', authRouter);
globalRouter.use('/subscribe', registerMeetupRouter);

export { globalRouter };
