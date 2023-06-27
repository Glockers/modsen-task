import { Router } from 'express';
import * as MeetupController from './meetup.controller';
import { createValidationMiddleware, filderValidationMiddleware, updateValidationMiddleware } from '../../common/middleware/meetup.middleware';
import { Role, authenticate, hasRole } from '../../common';
import { validateQueryParams } from '../../common/utils/validateQueryParams';
import { idNumberSchema } from '../../common/schemas/id.schema';

const meetupRouter = Router();

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
meetupRouter.get('/', filderValidationMiddleware(), MeetupController.getAll);

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
meetupRouter.get('/:id', validateQueryParams(idNumberSchema), MeetupController.getOneById);

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
  *       200:
  *         description: Success
  *       400:
  *        description: Bad request
*/
meetupRouter.post('/', authenticate('access'), hasRole([Role.ADMIN]), createValidationMiddleware(), MeetupController.create);

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
meetupRouter.put('/:id', authenticate('access'), hasRole([Role.ADMIN]), validateQueryParams(idNumberSchema), updateValidationMiddleware(), MeetupController.updateById);

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
meetupRouter.delete('/:id', authenticate('access'), hasRole([Role.ADMIN]), validateQueryParams(idNumberSchema), MeetupController.deleteById);

export default meetupRouter;
