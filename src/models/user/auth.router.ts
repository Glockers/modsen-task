import { Router } from 'express';
import { getProfileController, logOutController, loginController, refreshAccessToken, signUpController } from './user.controller';
import { authenticate, validateUserDTO } from '../../common/middleware/auth.middleware';
import { checkAuth } from '../../common';

const authRouter = Router();

authRouter.post('/login', validateUserDTO(), checkAuth(false, 'Вы уже авторизованы'), loginController);
authRouter.post('/signup', validateUserDTO(), checkAuth(false, 'Вы уже авторизованы'), signUpController);
authRouter.post('/refresh-tokens', authenticate('access'), refreshAccessToken);
authRouter.post('/logout', authenticate('access'), logOutController);
authRouter.get('/profile', authenticate('access'), getProfileController);

export default authRouter;
