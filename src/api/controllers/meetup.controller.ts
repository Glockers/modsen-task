import { Response, Request } from 'express';
import { TValidatePayloadCreate, TValidatePayloadUpdate } from '../middleware/meetup.middleware';
import * as DBService from '../../db/services/meetup.service';

export const create = async (req: TValidatePayloadCreate, res: Response) => {
  const validatedPayload = req.validatedPayload;
  const result = await DBService.create(validatedPayload);
  res.status(result.status).send(result);
};

export const deleteById = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const result = await DBService.deleteById(id);
  res.status(result.status).send(result);
};

export const updateById = async (req: TValidatePayloadUpdate, res: Response) => {
  const id = Number(req.params.id);
  const validatedPayload = req.validatedPayload;
  const result = await DBService.update(id, validatedPayload);
  res.status(result.status).send(result);
};

export const getOneById = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const result = await DBService.getOneById(id);
  res.status(result.status).send(result.data);
};

export const getAll = async (req: Request, res: Response) => {
  const meetupsResult = await DBService.getAll();
  res.status(meetupsResult.status).send(meetupsResult);
};
