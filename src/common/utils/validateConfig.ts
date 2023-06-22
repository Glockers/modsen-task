import { Schema } from 'joi';
import { AppError } from '../exceptions/AppError';

// TODO спросить про какой HTTP CODE возвращать
function validateConfig<T>(shema: Schema<T>) {
  const config = shema.validate(process.env);

  if (config.error) {
    throw AppError.BadRequest(`Config validation error: ${config.error.message}`);
  }

  return config.value;
}

export default validateConfig;
