import { Router } from 'express';
import { authenticate, createMeetupValidationMiddleware, filterMeetupValidationMiddleware, hasRole, updateMeetupValidationMiddleware } from '../../common/middleware';
import { validateQueryParams } from '../../common/utils';
import { idNumberSchema } from '../../common/schemas';
import { Role } from '../../common/types';
import { EAuthMessageError } from '../../common/types/authMessageError';
import { JwtStrategyType } from '../../common/types/strategy.enum';
import Container from 'typedi';
import { MeetupController } from './meetup.controller';

const meetupRouter = Router();
const meetupControoler = Container.get(MeetupController);

/**
  * @openapi
  * /api/v1/meetup/:
  *  get:
  *     tags:
  *     - Meetup
  *     description: Get all meetups
  *     parameters:
  *      - $ref: '#/components/parameters/FilterMeetupsQuerySearch'
  *      - $ref: '#/components/parameters/FilterMeetupsQueryFilter'
  *      - $ref: '#/components/parameters/FilterMeetupsQueryPage'
  *      - $ref: '#/components/parameters/FilterMeetupsQueryLimit'
  *      - $ref: '#/components/parameters/FilterMeetupsQuerySortBy'
  *      - $ref: '#/components/parameters/FilterMeetupsQuerySortOrder'
  *     responses:
  *       200:
  *         description: Success
  *       400:
  *        description: Bad request
*/
meetupRouter.get('/', filterMeetupValidationMiddleware(), meetupControoler.getAll);

/**
  * @openapi
  * /api/v1/meetup/{id}:
  *   get:
  *     tags:
  *     - Meetup
  *     description: Get one meetup
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
  *         description: Success
  *       400:
  *        description: Bad request
*/
meetupRouter.get('/:id', validateQueryParams(idNumberSchema), meetupControoler.getOneById);

/**
  * @openapi
  * /api/v1/meetup/:
  *  post:
  *     tags:
  *     - Meetup
  *     description: add one meetup
  *     requestBody:
  *       required: true
  *       content:
  *         application/json:
  *           schema:
  *             $ref: '#/components/schemas/CreateMeetupSchema'
  *     responses:
  *       201:
  *         description: Success
  *       400:
  *        description: Bad request
*/
meetupRouter.post('/', authenticate(JwtStrategyType.ACCESS_JWT_STRATEGY, EAuthMessageError.UNAUTHORIZED), hasRole([Role.ADMIN]), createMeetupValidationMiddleware(), meetupControoler.create);

/**
  * @openapi
  * /api/v1/meetup/{id}:
  *   put:
  *     tags:
  *     - Meetup
  *     description: Update meetup
  *     requestBody:
  *       required: false
  *       content:
  *         application/json:
  *           schema:
  *             $ref: '#/components/schemas/UpdateMeetupSchema'
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
  *         description: Success
  *       400:
  *        description: Bad request
*/
meetupRouter.put('/:id', authenticate(JwtStrategyType.ACCESS_JWT_STRATEGY, EAuthMessageError.UNAUTHORIZED), hasRole([Role.ADMIN]), validateQueryParams(idNumberSchema), updateMeetupValidationMiddleware(), meetupControoler.updateById);

/**
  * @openapi
  * /api/v1/meetup/{id}:
  *   delete:
  *     tags:
  *     - Meetup
  *     description: Delete meetup
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
  *         description: Success
  *       400:
  *        description: Bad request
*/
meetupRouter.delete('/:id', authenticate(JwtStrategyType.ACCESS_JWT_STRATEGY, EAuthMessageError.UNAUTHORIZED), hasRole([Role.ADMIN]), validateQueryParams(idNumberSchema), meetupControoler.deleteById);

export { meetupRouter };
