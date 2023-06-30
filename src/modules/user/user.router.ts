import { Router } from 'express';
import { authenticate } from '../../common/middleware/auth.middleware';
import { userController } from './user.controller';

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
userRouter.get('/profile', authenticate('access'), userController.getProfileController);

export { userRouter };
