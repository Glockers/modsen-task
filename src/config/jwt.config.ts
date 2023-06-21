import Joi from 'joi';
import validateConfig from '../common/utils/validateConfig';

interface IJWTConfig {
  JWT_ACCESS_SECRET: string,
  REFRESH_TOKEN_EXPIRATION: string,
  ACCESS_TOKEN_EXPIRATION: string,
  JWT_REFRESH_SECRET: string
}

const validationSchema = Joi.object<IJWTConfig>({
  JWT_ACCESS_SECRET: Joi.string().required(),
  REFRESH_TOKEN_EXPIRATION: Joi.string().required(),
  ACCESS_TOKEN_EXPIRATION: Joi.string().required(),
  JWT_REFRESH_SECRET: Joi.string().required()
}).unknown();

const jwtConfig = validateConfig<IJWTConfig>(validationSchema);
export default jwtConfig;
