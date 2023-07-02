import { Request } from 'express';

export type BodyRequestType<T> = Request<{}, {}, T>;
export type ParamsRequestType<T> = Request<T>
export type QueryRequestType<T> = Request<{}, {}, {}, T>;

export function extractDataFromRequest<T>(req: BodyRequestType<T> | ParamsRequestType<T> | QueryRequestType<T>, data: keyof Request): T | null {
  const payload = req[data];
  if (!payload) return null;
  return payload;
}

export const extractDataFromBody = <T>(req: BodyRequestType<T>) =>
  extractDataFromRequest<T>(req, 'body');

export const extractDataFromParams = <T>(req: ParamsRequestType<T>) =>
  extractDataFromRequest<T>(req, 'params');

export const extractDataFromQuery = <T>(req: QueryRequestType<T>) =>
  extractDataFromRequest<T>(req, 'query');
