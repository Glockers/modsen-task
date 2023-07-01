import { Router } from 'express';
import { authenticate } from '../../common/middleware/auth.middleware';
import { EAuthMessageError } from '../../common/types/authMessageError';
import { JwtStrategyType } from '../../common/types/strategy.enum';
import Container from 'typedi';
import { UserController } from './user.controller';

const userRouter = Router();
const userController = Container.get(UserController);

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
