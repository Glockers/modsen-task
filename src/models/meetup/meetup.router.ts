import { Router } from 'express';
import * as MeetupController from './meetup.controller';
import { createValidationMiddleware, filderValidationMiddleware, updateValidationMiddleware } from '../../common/middleware/meetup.middleware';
import { Role, authenticate, hasRole } from '../../common';
import { validateQueryParams } from '../../common/utils/validateQueryParams';
import { idNumberSchema } from '../../common/schema/id.schema';

const meetupRouter = Router();

/**
  * @openapi
  * /:
  *  get:
  *     tags:
  *     - Meetup
  *     description: Get all meetups
  *     responses:
  *       200:
  *         description: App is up and running
*/
meetupRouter.get('/', filderValidationMiddleware(), MeetupController.getAll);

meetupRouter.get('/:id', validateQueryParams(idNumberSchema), MeetupController.getOneById);

meetupRouter.post('/', authenticate('access'), hasRole([Role.ADMIN]), createValidationMiddleware(), MeetupController.create);

meetupRouter.put('/:id', authenticate('access'), hasRole([Role.ADMIN]), validateQueryParams(idNumberSchema), updateValidationMiddleware(), MeetupController.updateById);

meetupRouter.delete('/:id', authenticate('access'), hasRole([Role.ADMIN]), validateQueryParams(idNumberSchema), MeetupController.deleteById);

export default meetupRouter;
