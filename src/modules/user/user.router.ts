import { Router } from 'express';
import { authenticate } from '../../common/middleware/auth.middleware';
import { EAuthMessageError } from '../../common/types/authMessageError';
import { JwtStrategyType } from '../../common/types/strategy.enum';
import Container from 'typedi';
import { UserController } from './user.controller';
import { hasRole } from '../../common/middleware';
import { Role } from '../../common/types';
import { validateQueryParams } from '../../common/utils';
import { loginUserSchema } from './schemas/user.schema';

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
  *         description: user profile
  *       401:
  *        description: Unauthorized
  *       500:
  *        description: Internal server error
*/
userRouter.get('/profile', authenticate(JwtStrategyType.ACCESS_JWT_STRATEGY, EAuthMessageError.UNAUTHORIZED), userController.getProfile);

/**
  * @openapi
  * /api/v1/user/my-meetups:
  *  get:
  *     tags:
  *     - User
  *     description: Get user info
  *     responses:
  *       200:
  *         description: get users regitrations
  *       401:
  *        description: Unauthorized
  *       500:
  *        description: Internal server error
*/
userRouter.get('/my-meetups', authenticate(JwtStrategyType.ACCESS_JWT_STRATEGY, EAuthMessageError.UNAUTHORIZED), userController.getMyMeetups);

/**
  * @openapi
  * /api/v1/user/delete/{login}:
  *   delete:
  *     tags:
  *     - User
  *     description: Delete user
  *     parameters:
  *     - in: path
  *       name: login
  *       required: true
  *       schema:
  *         type: string
  *       description: login of the user
  *     responses:
  *       200:
  *         description: Success
  *       400:
  *        description: Bad request
  *       401:
  *        description: Unauthorized
  *       403:
  *        description: Forbidden
  *       409:
  *        description: You cannot delete yourself
  *       500:
  *        description: Internal server error
*/
userRouter.delete('/delete/:login', authenticate(JwtStrategyType.ACCESS_JWT_STRATEGY, EAuthMessageError.UNAUTHORIZED), hasRole([Role.USER]), validateQueryParams(loginUserSchema), userController.deleteUser);

/**
  * @openapi
  * /api/v1/user/users:
  *  get:
  *     tags:
  *     - User
  *     description: Get user info
  *     responses:
  *       200:
  *         description: get all users
  *       401:
  *        description: Unauthorized
  *       403:
  *        description: Forbidden
  *       500:
  *        description: Internal server error
*/
userRouter.get('/users', authenticate(JwtStrategyType.ACCESS_JWT_STRATEGY, EAuthMessageError.UNAUTHORIZED), hasRole([Role.ADMIN]), userController.getUsers);

export { userRouter };
