import Joi from '@hapi/joi';

const validationSchema = Joi.object({
  LEVEL: Joi.string().valid('debug', 'error', 'info'),
  LOGGER_CONTEXT_NAME: Joi.string().default('context'),
});


const loggerConfig = validationSchema.validate({
    LEVEL: process.env.LOG_LEVEL,
    LOGGER_CONTEXT_NAME: process.env.LOGGER_CONTEXT_NAME
})

export default loggerConfig;
