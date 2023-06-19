import createLogger from '../common/utils/logger';
import PostgresDataSource from './db/postgres';

const logger = createLogger(__filename);

async function checkPostgressConnection() {
  try {
    await PostgresDataSource.initialize();
    logger.info('Connection has been established successfully.');
  } catch (error) {
    logger.error('Unable to connect to the database:', error);
  }
}

const initDatabases = () => Promise.all([
  checkPostgressConnection()
]);

export default initDatabases;
