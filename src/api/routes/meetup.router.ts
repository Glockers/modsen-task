import { Router, Request, Response } from 'express';
import * as MeetupController from '../controllers/meetup.controller';
import { createMeetupValidationMiddleware } from '../middleware/meetup.middleware';

const meetupRouter = Router();

meetupRouter.get('/', async (req: Request, res: Response) => {
  res.send('All meetup');
});

meetupRouter.get('/:id', MeetupController.getOneById);

meetupRouter.post('/', createMeetupValidationMiddleware, MeetupController.create);

meetupRouter.put('/:id', async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  res.send('edit meetup: ' + id);
});

meetupRouter.delete('/:id', MeetupController.deleteById);

export default meetupRouter;
