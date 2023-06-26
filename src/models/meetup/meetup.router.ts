import { Router } from 'express';
import * as MeetupController from './meetup.controller';
import { createValidationMiddleware, filderValidationMiddleware, updateValidationMiddleware } from '../../common/middleware/meetup.middleware';
import { Role, authenticate, hasRole } from '../../common';
import { validateQueryParams } from '../../common/utils/validateQueryParams';
import { idNumberSchema } from '../../common/schema/id.schema';

const meetupRouter = Router();

/**
  * @openapi
  * /api/v1/meetup/:
  *  get:
  *     tags:
  *     - Meetup
  *     description: Get all meetups
  *     responses:
  *       200:
  *         description: App is up and running
*/
meetupRouter.get('/', filderValidationMiddleware(), MeetupController.getAll);

/**
  * @openapi
  * /api/v1/meetup/:id:
  *  get:
  *     tags:
  *     - Meetup
  *     description: Get one meetup
  *     responses:
  *       200:
  *         description: App is up and running
*/
meetupRouter.get('/:id', validateQueryParams(idNumberSchema), MeetupController.getOneById);

/**
  * @openapi
  * /api/v1/meetup/:
  *  post:
  *     tags:
  *     - Meetup
  *     description: add one meetup
  *     responses:
  *       200:
  *         description: App is up and running
*/
meetupRouter.post('/', authenticate('access'), hasRole([Role.ADMIN]), createValidationMiddleware(), MeetupController.create);

/**
  * @openapi
  * /api/v1/meetup/:id:
  *  put:
  *     tags:
  *     - Meetup
  *     description: update meetup
  *     responses:
  *       200:
  *         description: App is up and running
*/
meetupRouter.put('/:id', authenticate('access'), hasRole([Role.ADMIN]), validateQueryParams(idNumberSchema), updateValidationMiddleware(), MeetupController.updateById);

/**
  * @openapi
  * /api/v1/meetup/:id:
  *  delete:
  *     tags:
  *     - Meetup
  *     description: delete meetup
  *     responses:
  *       200:
  *         description: App is up and running
*/
meetupRouter.delete('/:id', authenticate('access'), hasRole([Role.ADMIN]), validateQueryParams(idNumberSchema), MeetupController.deleteById);

export default meetupRouter;
