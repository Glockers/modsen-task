import { Router } from 'express';
import meetupRouter from './meetup.router';
import authRouter from './auth.router';

const router = Router();

router.use('/meetup', meetupRouter);
router.use(authRouter);

export default router;
