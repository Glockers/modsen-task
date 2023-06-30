import Joi from 'joi';
import { validateConfig } from '../common/utils/validateConfig';

interface IPostgreConfig {
  TYPEORM_HOST: string,
  TYPEORM_USERNAME: string,
  TYPEORM_PASSWORD: string,
  TYPEORM_CONNECTION: 'postgres' | 'mysql';
  TYPEORM_DATABASE: string,
  TYPEORM_SYNCHRONIZE: boolean,
  TYPEORM_LOGGING: boolean,
}
const validationSchema = Joi.object<IPostgreConfig>({
  TYPEORM_DATABASE: Joi.string().required(),
  TYPEORM_HOST: Joi.string().default('http://localhost').required(),
  TYPEORM_USERNAME: Joi.string().required(),
  TYPEORM_PASSWORD: Joi.string().required(),
  TYPEORM_LOGGING: Joi.boolean().default(false).required(),
  TYPEORM_SYNCHRONIZE: Joi.boolean().default(true).required(),
  TYPEORM_CONNECTION: Joi.string().default('postgres').required()
}).unknown();

export const typeormConfig = validateConfig<IPostgreConfig>(validationSchema);
