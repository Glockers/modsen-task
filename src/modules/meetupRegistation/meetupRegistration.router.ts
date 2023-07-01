import { Router } from 'express';
import { validateQueryParams } from '../../common/utils';
import { idNumberSchema } from '../../common/schemas';
import { authenticate } from '../../common/middleware';
import { meetupRegistrationController } from './meetupRegistration.controller';
import { EAuthMessageError } from '../../common/types/authMessageError';
import { JwtStrategyType } from '../../common/types/strategy.enum';

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
registerMeetupRouter.post('/:id', authenticate(JwtStrategyType.ACCESS_JWT_STRATEGY, EAuthMessageError.UNAUTHORIZED), validateQueryParams(idNumberSchema), meetupRegistrationController.registerUserForMeetupController);

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
registerMeetupRouter.get('/', authenticate(JwtStrategyType.ACCESS_JWT_STRATEGY, EAuthMessageError.UNAUTHORIZED), meetupRegistrationController.getAllRegisterOnMeetup);

export { registerMeetupRouter };
