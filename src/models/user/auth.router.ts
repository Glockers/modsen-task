import { Router } from 'express';
import { getProfileController, logOutController, loginController, refreshAccessToken, signUpController } from './user.controller';
import { authenticate, validateUserDTO } from '../../common/middleware/auth.middleware';
import { Role, hasRole } from '../../common';

const authRouter = Router();

authRouter.post('/login', validateUserDTO(), loginController);
authRouter.post('/signup', validateUserDTO(), signUpController);
authRouter.post('/refresh-tokens', authenticate('access'), hasRole([Role.ADMIN, Role.USER]), refreshAccessToken);
authRouter.post('/logout', authenticate('access'), hasRole([Role.ADMIN, Role.USER]), logOutController);
authRouter.get('/profile', authenticate('access'), hasRole([Role.ADMIN, Role.USER]), getProfileController);

export default authRouter;
