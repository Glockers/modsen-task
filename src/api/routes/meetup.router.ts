import { Router } from 'express';
import * as MeetupController from '../controllers/meetup.controller';
import { createMeetupValidationMiddleware, updateMeetupValidationMiddleware } from '../middleware/meetup.middleware';

const meetupRouter = Router();

meetupRouter.get('/', MeetupController.getAll);

meetupRouter.get('/:id', MeetupController.getOneById);

meetupRouter.post('/', createMeetupValidationMiddleware, MeetupController.create);

meetupRouter.put('/:id', updateMeetupValidationMiddleware, MeetupController.updateById);

meetupRouter.delete('/:id', MeetupController.deleteById);

export default meetupRouter;
