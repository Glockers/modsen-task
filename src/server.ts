import 'dotenv/config';
// import dbInit from './db/init';
// import routes from './api/routes';
// import createLogger from './api/utils/logger';
// import passport from 'passport';
// import { accessJWTStrategy } from './config/jwt/jwt.module';
// import { authenticateAccess } from './api/middleware/authenticateAccess.middleware';
import app from './app';
import appConfig from './config/app.config';
import createLogger from './common/utils/logger';

const logger = createLogger(__filename);

// app.use(passport.initialize());

// passport.use('access', accessJWTStrategy);

// app.get('/protected', authenticateAccess, (req: any, res: any) => {
//   res.json({ message: 'Защищенный маршрут' });
// });

const server = app.listen(appConfig.APP_PORT, () => {
  logger.info(`Server is running at ${appConfig.APP_HOST}:${appConfig.APP_PORT}`);
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
