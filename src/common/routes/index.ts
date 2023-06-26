import { Router } from 'express';
import meetupRouter from '../../models/meetup/meetup.router';
import userRouter from '../../models/user/user.router';
import registerMeetupRouter from '../../models/meetupRegistation/meetupRegistration.router';
import authRouter from '../../authentication/auth.router';

const router = Router();

router.use('/meetup', meetupRouter);
router.use('/user', userRouter);
router.use('/auth', authRouter);
router.use('/subscribe', registerMeetupRouter);

export default router;
