import { Response, Request } from 'express';
import * as DBService from '../../db/services/meetup.service';
import { TCreateMeetupDTO, TUpdateMeetupDTO, TFilterMeetupsDTO } from '../dto/meetup.dto';
import { TValidatePayload } from '../middleware/validateDTO.middlware';

export const create = async (req: TValidatePayload<TCreateMeetupDTO>, res: Response) => {
  const validatedPayload = req.validatedPayload;
  const result = await DBService.create(validatedPayload);
  res.status(result.status).send(result);
};

export const deleteById = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const result = await DBService.deleteById(id);
  res.status(result.status).send(result);
};

export const updateById = async (req: TValidatePayload<TUpdateMeetupDTO>, res: Response) => {
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
  const params: TFilterMeetupsDTO = req.query;
  const meetupsResult = await DBService.getAll(params);
  res.status(meetupsResult.status).send(meetupsResult);
};
