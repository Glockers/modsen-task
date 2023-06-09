import { Router } from 'express';
import { authenticate, checkAuth, validateLogInDTO, validateRegInDTO } from '../common/middleware';
import { EAuthMessageError } from '../common/types/authMessageError';
import { JwtStrategyType } from '../common/types/strategy.enum';
import Container from 'typedi';
import { AuthController } from './auth.controller';

const authRouter = Router();
const authController = Container.get(AuthController);

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
authRouter.post('/login', validateLogInDTO(), checkAuth(false, 'Вы уже авторизованы'), authController.loginController);

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
  *       204:
  *         description: success
  *       409:
  *        description: such user already exists
  *       400:
  *        description: Bad request
  *       500:
  *        description: Internal server error
*/
authRouter.post('/signup', validateRegInDTO(), checkAuth(false, 'Вы уже авторизованы'), authController.signUpController);

/**
  * @openapi
  * /api/v1/auth/refresh-tokens:
  *  post:
  *     tags:
  *     - Auth
  *     description: refresh token
  *     responses:
  *       200:
  *         description: success
  *       401:
  *         description: Unauthorized
  *       500:
  *        description: Internal server error
*/
authRouter.post('/refresh-tokens', authenticate(JwtStrategyType.REFRESH_JWT_STRATEGY, EAuthMessageError.INVALID_REFRESH_TOKEN), authController.refreshAccessToken);

/**
  * @openapi
  * /api/v1/auth/logout:
  *  post:
  *     tags:
  *     - Auth
  *     description: logout
  *     responses:
  *       200:
  *         description: logout from system
  *       401:
  *        description: Unauthorized
  *       500:
  *        description: Internal server error
*/
authRouter.post('/logout', authenticate(JwtStrategyType.ACCESS_JWT_STRATEGY, EAuthMessageError.UNAUTHORIZED), authController.logOutController);

export { authRouter };
