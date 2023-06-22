import { Router } from 'express';
import meetupRouter from '../../models/meetup/meetup.router';
import authRouter from '../../models/user/auth.router';
import registerMeetupRouter from '../../models/meetupRegistation/meetupRegistration.router';

const router = Router();

router.use('/meetup', meetupRouter);
router.use(authRouter);
router.use('/reg', registerMeetupRouter);

export default router;
