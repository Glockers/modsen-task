import log4js from 'log4js';
import path from 'path';
import { createConfigLogger } from '../../config/log4js.config';

const config = createConfigLogger();

const createLogger = (context: string) => {
  log4js.configure(config.configLogger);
  const logger = log4js.getLogger();
  logger.addContext(config.contextName, path.relative('src', context));
  logger.level = config.contextName;
  return logger;
};

export default createLogger;
