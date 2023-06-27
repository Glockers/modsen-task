import { Schema } from 'joi';
import { AppError } from '../exceptions/AppError';

function validateConfig<T>(shema: Schema<T>) {
  const config = shema.validate(process.env);

  if (config.error) {
    throw AppError.BadRequest(`Config validation error: ${config.error.message}`);
  }

  return config.value;
}

export default validateConfig;
