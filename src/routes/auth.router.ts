import { Router } from 'express';
import { loginUser, refreshAccessToken, signupUser } from '../controllers/auth.controller';
import { validateUserDTO } from '../middleware/auth.moddleware';

const authRouter = Router();

authRouter.post('/login', validateUserDTO(), loginUser);
authRouter.post('/signup', validateUserDTO(), signupUser);
authRouter.post('/refresh-tokens', refreshAccessToken);

export default authRouter;
