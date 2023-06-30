import { Router } from 'express';
import { logOutController, loginController, refreshAccessToken, signUpController } from './auth.controller';
import { authenticate, checkAuth, validateLogInDTO, validateRegInDTO } from '../common/middleware';

const authRouter = Router();

/**
 * @openapi
 * /api/v1/auth/login:
 *   post:
 *     tags:
 *       - Auth
 *     description: Login user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schema/userLogin'
 *     responses:
 *       200:
 *         description: Success login
 *       409:
 *        description: user is already logged in
 *       400:
 *        description: Bad request
 *       500:
 *        description: Internal server error
*/
authRouter.post('/login', validateLogInDTO(), checkAuth(false, 'Вы уже авторизованы'), loginController);

/**
  * @openapi
  * /api/v1/auth/signup:
  *  post:
  *     tags:
  *     - Auth
  *     description: signup user
  *     requestBody:
  *       required: true
  *       content:
  *         application/json:
  *           schema:
  *             $ref: '#/components/schema/userSignUpSchema'
  *     responses:
  *       200:
  *         description: success
  *       409:
  *        description: such user already exists
  *       400:
  *        description: Bad request
  *       500:
  *        description: Internal server error
*/
authRouter.post('/signup', validateRegInDTO(), checkAuth(false, 'Вы уже авторизованы'), signUpController);

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
  *       401:
  *         description: Unauthorized
  *       500:
  *        description: Internal server error
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
  *       401:
  *        description: Unauthorized
  *       500:
  *        description: Internal server error
*/
authRouter.post('/logout', authenticate('access'), logOutController);

export { authRouter };
