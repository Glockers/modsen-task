import { Router } from 'express';
import { loginUser, signupUser } from '../controllers/auth.controller';
import { validateUserDTO } from '../middleware/auth.moddleware';

const authRouter = Router();

authRouter.post('/login', validateUserDTO(), loginUser);
authRouter.post('/signup', validateUserDTO(), signupUser);

export default authRouter;
