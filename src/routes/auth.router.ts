import { Router } from 'express';
import { logOutController, loginController, refreshAccessToken, signUpController } from '../controllers/auth.controller';
import { validateUserDTO } from '../middleware/auth.middleware';

const authRouter = Router();

authRouter.post('/login', validateUserDTO(), loginController);
authRouter.post('/signup', validateUserDTO(), signUpController);
authRouter.post('/refresh-tokens', refreshAccessToken);
authRouter.post('/logout', logOutController);

export default authRouter;
