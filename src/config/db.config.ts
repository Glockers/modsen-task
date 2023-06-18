import Joi from '@hapi/joi';

const validationSchema = Joi.object({
  POSTGRESS_NAME: Joi.string(),
  POSTGRESS_HOST: Joi.string().default('http://localhost'),
  POSTGRESS_USER: Joi.string(),
  POSTGRESS_PASSWORD: Joi.string(),
  LOGGING_DATABSE: Joi.boolean().default(false),
  POSTGRESS_DIALECT: Joi.valid('postgres')
});

const dbConfig = validationSchema.validate({
    POSTGRESS_NAME: process.env.POSTGRESS_DATABASE,
    POSTGRESS_HOST: process.env.POSTGRESS_HOST,
    POSTGRESS_PASSWORD: process.env.POSTGRESS_PASSWORD,
    POSTGRESS_USER: process.env.POSTGRESS_USER,
    LOGGING_DATABSE: process.env.LOG_DB,

})
export default dbConfig;
