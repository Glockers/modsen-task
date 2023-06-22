import { Router } from 'express';
import { getAllRegisterOnMeetup, registerUserForMeetupController } from './meetupRegistration.controller';
import { Role, authenticate, hasRole } from '../../common';

const registerMeetupRouter = Router();

registerMeetupRouter.post('/:id', authenticate('access'), hasRole([Role.ADMIN, Role.USER]), registerUserForMeetupController);
registerMeetupRouter.get('/', authenticate('access'), hasRole([Role.ADMIN, Role.USER]), getAllRegisterOnMeetup);

export default registerMeetupRouter;
