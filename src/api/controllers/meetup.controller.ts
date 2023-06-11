import { Response } from 'express';
import { TFilterMeetupsDTO, TUpdateMeetupDTO } from '../dto/meetup.dto';
import { TValidatePayload } from '../middleware/meetup.middleware';
import * as DBService from '../../db/services/meetup.service';
export const create = async (req: TValidatePayload, res: Response) => {
  const validatedPayload = req.validatedPayload;
  const result = await DBService.create(validatedPayload);
  res.status(200).send(result);
};

export const deleteById = async (id: number) => {

};

export const updateById = async (id: number, payload: TUpdateMeetupDTO) => {

};

export const getOneById = async (id: number) => {

};

export const getAll = async (filter: TFilterMeetupsDTO) => {

};
