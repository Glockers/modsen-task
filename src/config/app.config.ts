import Joi from '@hapi/joi';

const validationSchema = Joi.object({
  APP_ENV: Joi.string()
    .valid('development', 'production', 'test')
    .default('development'),
  APP_URL: Joi.string().default('http://localhost'),
  APP_PORT: Joi.number().default(8000)
});

const appConfig = validationSchema.validate({
  APP_PORT: process.env.PORT,
  APP_URL: process.env.API_HOST,
  APP_ENV: process.env.NODE_ENV,
});

export default appConfig;