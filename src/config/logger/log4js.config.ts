import Joi from 'joi';
import { validateConfig } from '../../common/utils/validateConfig';

interface ILoggerConfig {
  LOGGER_LEVEL: string,
  LOGGER_CONTEXT_NAME: string
}

const validationSchema = Joi.object<ILoggerConfig>({
  LOGGER_LEVEL: Joi.string().valid('debug', 'error', 'info').required(),
  LOGGER_CONTEXT_NAME: Joi.string().default('context').required()
}).unknown();

export const loggerConfig = validateConfig<ILoggerConfig>(validationSchema);
