import { Router, Request, Response } from 'express';

const meetupRouter = Router();

meetupRouter.get('/', async (req: Request, res: Response) => {
  res.send('All meetup');
});

meetupRouter.get('/:id', async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  res.send(`One meetup ${id}`);
});

meetupRouter.post('/', async (req: Request, res: Response) => {
  res.send('add meetup');
});

meetupRouter.put('/:id', async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  res.send('edit meetup: ' + id);
});

meetupRouter.delete('/:id', async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  res.send('delete meetup: ' + id);
});

export default meetupRouter;
