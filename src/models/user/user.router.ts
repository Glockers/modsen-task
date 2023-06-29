import { Router } from 'express';
import { getProfileController } from './user.controller';
import { authenticate } from '../../common/middleware/auth.middleware';

const userRouter = Router();

/**
  * @openapi
  * /api/v1/user/profile:
  *  get:
  *     tags:
  *     - User
  *     description: Get user info
  *     responses:
  *       200:
  *         description: App is up and running
*/
userRouter.get('/profile', authenticate('access'), getProfileController);

export { userRouter };
