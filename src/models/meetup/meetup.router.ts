import { Router } from 'express';
import * as MeetupController from './meetup.controller';
import { createValidationMiddleware, updateValidationMiddleware } from '../../common/middleware/meetup.middleware';

const meetupRouter = Router();

meetupRouter.get('/', MeetupController.getAll);

meetupRouter.get('/:id', MeetupController.getOneById);

meetupRouter.post('/', createValidationMiddleware(), MeetupController.create);

meetupRouter.put('/:id', updateValidationMiddleware(), MeetupController.updateById);

meetupRouter.delete('/:id', MeetupController.deleteById);

export default meetupRouter;
