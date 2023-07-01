import { Router } from 'express';
import { authenticate } from '../../common/middleware/auth.middleware';
import { userController } from './user.controller';
import { EAuthMessageError } from '../../common/types/authMessageError';
import { JwtStrategyType } from '../../common/types/strategy.enum';

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
userRouter.get('/profile', authenticate(JwtStrategyType.ACCESS_JWT_STRATEGY, EAuthMessageError.UNAUTHORIZED), userController.getProfileController);

export { userRouter };
