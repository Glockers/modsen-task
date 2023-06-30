import log4js from 'log4js';
import path from 'path';
import { createConfigLogger, loggerConfig } from '../../config';

const config = createConfigLogger();

export const createLogger = (context: string) => {
  log4js.configure(config.configLogger);
  const logger = log4js.getLogger();
  logger.addContext(loggerConfig.LOGGER_CONTEXT_NAME, path.relative('src', context));
  logger.level = loggerConfig.LOGGER_CONTEXT_NAME;
  return logger;
};
