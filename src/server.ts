import 'dotenv/config';
import { app } from './app';
import { appConfig } from './config';
import { createLogger } from './common/utils';

const logger = createLogger(__filename);

const server = app.listen(appConfig.PORT, () => {
  logger.info(`Server is running at ${appConfig.APP_HOST} on PORT: ${appConfig.PORT}`);
});

process.on('unhandledRejection', (err: Error) => {
  logger.error({ name: err.name, message: err.message }, 'UNHANDLED REJECTION! 💥 Shutting down...');
  server.close(() => {
    process.exit(1);
  });
});

process.on('SIGTERM', () => {
  logger.error('SIGTERM RECEIVED. Shutting down gracefully...');
  server.close(() => {
    logger.error('Process terminated...');
  });
});

export { server };
