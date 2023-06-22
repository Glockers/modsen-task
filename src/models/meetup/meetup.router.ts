import { Router } from 'express';
import * as MeetupController from './meetup.controller';
import { createValidationMiddleware, updateValidationMiddleware } from '../../common/middleware/meetup.middleware';
import { Role, authenticate, hasRole } from '../../common';

const meetupRouter = Router();

meetupRouter.get('/', MeetupController.getAll);

meetupRouter.get('/:id', MeetupController.getOneById);

meetupRouter.post('/', authenticate('access'), hasRole([Role.ADMIN]), createValidationMiddleware(), MeetupController.create);

meetupRouter.put('/:id', authenticate('access'), hasRole([Role.ADMIN]), updateValidationMiddleware(), MeetupController.updateById);

meetupRouter.delete('/:id', authenticate('access'), hasRole([Role.ADMIN]), MeetupController.deleteById);

export default meetupRouter;
