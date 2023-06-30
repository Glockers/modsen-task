import { AppError } from '../../common/exceptions/AppError';
import { createLogger } from '../../common/utils';
import { PostgresDataSource } from './postgres';

const logger = createLogger(__filename);

export async function checkPostgressConnection() {
  try {
    await PostgresDataSource.initialize();
    logger.info('Connection has been established successfully.');
  } catch (error) {
    logger.error('Unable to connect to the database:', error);
    throw AppError.InternalServerError(`Unable to connect to the database: ${error}`);
  }
}
