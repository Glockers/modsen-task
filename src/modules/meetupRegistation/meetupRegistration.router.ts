import { Router } from 'express';
import { validateQueryParams } from '../../common/utils';
import { idNumberSchema } from '../../common/schemas';
import { authenticate } from '../../common/middleware';
import { meetupRegistrationController } from './meetupRegistration.controller';

const registerMeetupRouter = Router();

/**
  * @openapi
  * /api/v1/subscribe/{id}:
  *  post:
  *     tags:
  *     - Subscribe one meetup
  *     description: Subscribe on meetup
  *     parameters:
  *     - in: path
  *       name: id
  *       required: true
  *       schema:
  *         type: integer
  *         minimum: 0
  *       description: ID of the meetup
  *     responses:
  *       200:
  *         description: App is up and running
*/
registerMeetupRouter.post('/:id', authenticate('access'), validateQueryParams(idNumberSchema), meetupRegistrationController.registerUserForMeetupController);

/**
  * @openapi
  * /api/v1/subscribe/:
  *  get:
  *     tags:
  *     - Subscribe one meetup
  *     description: Get all subscribs
  *     responses:
  *       200:
  *         description: App is up and running
*/
registerMeetupRouter.get('/', authenticate('access'), meetupRegistrationController.getAllRegisterOnMeetup);

export { registerMeetupRouter };
