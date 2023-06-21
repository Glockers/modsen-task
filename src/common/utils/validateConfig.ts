import { Schema } from 'joi';

function validateConfig<T>(shema: Schema<T>) {
  const config = shema.validate(process.env);

  if (config.error) {
    throw new Error(`Config validation error: ${config.error.message}`);
  }

  return config.value;
}

export default validateConfig;
