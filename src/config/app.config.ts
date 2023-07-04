
import Joi from 'joi';
import { validateConfig } from '../common/utils/validateConfig';

interface IAppConfig {
  APP_NODE_ENV: string,
  APP_HOST: string,
  PORT: number
}
const validationSchema = Joi.object<IAppConfig>({
  APP_NODE_ENV: Joi.string()
    .valid('development', 'production', 'test')
    .default('development').required(),
  APP_HOST: Joi.string().default('http://localhost').required(),
  PORT: Joi.number().default(8000).required()
}).unknown();

export const appConfig = validateConfig<IAppConfig>(validationSchema);
