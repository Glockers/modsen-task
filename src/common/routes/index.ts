import { Router } from 'express';
import meetupRouter from '../../models/meetup/meetup.router';
import authRouter from '../../models/user/auth.router';

const router = Router();

router.use('/meetup', meetupRouter);
router.use(authRouter);

export default router;
