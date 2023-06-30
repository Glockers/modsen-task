import { loggerConfig } from './log4js.config';

const configLogger = {
  appenders: {
    out: {
      type: 'stdout',
      layout: {
        type: 'pattern',
        pattern: `%[[%d{dd/MM/yy hh:mm:ss} %X{${loggerConfig.LOGGER_CONTEXT_NAME}}] [%p]%] %m`
      }
    }
  },
  categories: { default: { appenders: ['out'], level: loggerConfig.LOGGER_LEVEL } }
};

export const createConfigLogger = () => {
  return {
    // loggingLevel,
    // contextName,
    configLogger
  };
};
