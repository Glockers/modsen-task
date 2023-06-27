
import Joi from 'joi';
import validateConfig from '../common/utils/validateConfig';

interface IAppConfig {
  APP_NODE_ENV: string,
  APP_HOST: string,
  APP_PORT: number
}
const validationSchema = Joi.object<IAppConfig>({
  APP_NODE_ENV: Joi.string()
    .valid('development', 'production', 'test')
    .default('development').required(),
  APP_HOST: Joi.string().default('http://localhost').required(),
  APP_PORT: Joi.number().default(8000).required()
}).unknown();

export default validateConfig<IAppConfig>(validationSchema);
