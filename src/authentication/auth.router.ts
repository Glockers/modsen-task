import { Router } from 'express';
import { authenticate, checkAuth, validateUserDTO } from '../common';
import { logOutController, loginController, refreshAccessToken, signUpController } from './auth.controller';

const authRouter = Router();

/**
  * @openapi
  * /api/v1/auth/login:
  *  post:
  *     tags:
  *     - Auth
  *     description: login user
  *     responses:
  *       200:
  *         description: App is up and running
*/
authRouter.post('/login', validateUserDTO(), checkAuth(false, 'Вы уже авторизованы'), loginController);

/**
  * @openapi
  * /api/v1/auth/signup:
  *  post:
  *     tags:
  *     - Auth
  *     description: signup user
  *     responses:
  *       200:
  *         description: App is up and running
*/
authRouter.post('/signup', validateUserDTO(), checkAuth(false, 'Вы уже авторизованы'), signUpController);

/**
  * @openapi
  * /api/v1/auth/refresh-tokens:
  *  post:
  *     tags:
  *     - Auth
  *     description: refresh token
  *     responses:
  *       200:
  *         description: App is up and running
*/
authRouter.post('/refresh-tokens', authenticate('access'), refreshAccessToken);

/**
  * @openapi
  * /api/v1/auth/logout:
  *  post:
  *     tags:
  *     - Auth
  *     description: logout
  *     responses:
  *       200:
  *         description: App is up and running
*/
authRouter.post('/logout', authenticate('access'), logOutController);

export default authRouter;
