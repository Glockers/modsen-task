import { Response, Request } from 'express';
import * as DBService from './meetup.service';
import { TValidatePayload } from '../../common/utils/validateDTO';
import { TCreateMeetupDTO, TFilterMeetupsDTO, TUpdateMeetupDTO } from '..';
import { catchAsyncFunction } from '../../common/exceptions/catchAsync';

export const create = catchAsyncFunction(async (req: TValidatePayload<TCreateMeetupDTO>, res: Response) => {
  const validatedPayload = req.validatedPayload;
  const result = await DBService.create(validatedPayload);
  res.status(result.status).send(result);
});

export const deleteById = catchAsyncFunction(async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const result = await DBService.deleteById(id);
  res.status(result.status).send(result);
});

export const updateById = catchAsyncFunction(async (req: TValidatePayload<TUpdateMeetupDTO>, res: Response) => {
  const id = Number(req.params.id);
  console.log(id);
  const validatedPayload = req.validatedPayload;
  const result = await DBService.update(id, validatedPayload);
  res.status(result.status).send(result);
});

export const getOneById = catchAsyncFunction(async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const result = await DBService.getOneById(id);
  res.status(result.status).json(result.data);
});

export const getAll = catchAsyncFunction(async (req: Request, res: Response) => {
  const params: TFilterMeetupsDTO = req.query;
  const meetupsResult = await DBService.getAll(params);
  res.status(meetupsResult.status).send(meetupsResult);
});
