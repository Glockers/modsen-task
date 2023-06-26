import { Router } from 'express';
import { getProfileController, logOutController, loginController, refreshAccessToken, signUpController } from './user.controller';
import { authenticate, validateUserDTO } from '../../common/middleware/auth.middleware';
import { Role, checkAuth, hasRole } from '../../common';

const authRouter = Router();

authRouter.post('/login', validateUserDTO(), checkAuth(false, 'Вы уже авторизованы'), loginController);
authRouter.post('/signup', validateUserDTO(), checkAuth(false, 'Вы уже авторизованы'), signUpController);
authRouter.post('/refresh-tokens', authenticate('access'), hasRole([Role.ADMIN, Role.USER]), refreshAccessToken);
authRouter.post('/logout', authenticate('access'), logOutController);
authRouter.get('/profile', authenticate('access'), getProfileController);

export default authRouter;
