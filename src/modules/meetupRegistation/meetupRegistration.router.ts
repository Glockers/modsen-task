import { Router } from 'express';
import { validateQueryParams } from '../../common/utils';
import { idNumberSchema } from '../../common/schemas';
import { authenticate } from '../../common/middleware';
import { EAuthMessageError } from '../../common/types/authMessageError';
import { JwtStrategyType } from '../../common/types/strategy.enum';
import Container from 'typedi';
import { MeetupRegistrationController } from './meetupRegistration.controller';

const registerMeetupRouter = Router();
const meetupRegistrationController = Container.get(MeetupRegistrationController);

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
  *       204:
  *         description: Subscribe on meetup
  *       401:
  *        description: Unauthorized
  *       500:
  *        description: Internal server error
*/
registerMeetupRouter.post('/:id', authenticate(JwtStrategyType.ACCESS_JWT_STRATEGY, EAuthMessageError.UNAUTHORIZED), validateQueryParams(idNumberSchema), meetupRegistrationController.registerUserOnMeetup);

/**
  * @openapi
  * /api/v1/subscribe/:
  *  get:
  *     tags:
  *     - Subscribe one meetup
  *     description: Get all subscribs
  *     responses:
  *       200:
  *         description: Get all subscribs
  *       401:
  *        description: Unauthorized
  *       500:
  *        description: Internal server error
*/
registerMeetupRouter.get('/', authenticate(JwtStrategyType.ACCESS_JWT_STRATEGY, EAuthMessageError.UNAUTHORIZED), meetupRegistrationController.getRegistrationsOnMeetup);

export { registerMeetupRouter };
