import { Response, Request } from 'express';
import { TFilterMeetupsDTO, TUpdateMeetupDTO } from '../dto/meetup.dto';
import { TValidatePayload } from '../middleware/meetup.middleware';
import * as DBService from '../../db/services/meetup.service';

export const create = async (req: TValidatePayload, res: Response) => {
  const validatedPayload = req.validatedPayload;
  const result = await DBService.create(validatedPayload);
  res.status(200).send(result);
};

export const deleteById = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const result = await DBService.deleteById(id);
  res.status(result.status).send(result);
};

export const updateById = async (id: number, payload: TUpdateMeetupDTO) => {

};

export const getOneById = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const result = await DBService.getOneById(id);
  res.status(result.status).send(result.data);
};

export const getAll = async (filter: TFilterMeetupsDTO) => {

};
