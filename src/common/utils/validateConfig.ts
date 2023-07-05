import { Schema } from 'joi';
import { AppError } from '../exceptions';
import 'dotenv/config';

export function validateConfig<T>(shema: Schema<T>): T {
  const config = shema.validate(process.env);

  if (config.error) {
    throw AppError.BadRequest(`Config validation error: ${config.error.message}`);
  }

  return config.value;
}
