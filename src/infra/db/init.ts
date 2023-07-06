
import { AppError } from '../../common/exceptions';
import { createLogger } from '../../common/utils';
import { PostgresDataSource } from './postgres';

const logger = createLogger(__filename);

export function initDatabase() {
  try {
    PostgresDataSource.initialize();
    logger.info('Connection has been established successfully.');
  } catch (error) {
    throw AppError.InternalServerError(`Unable to connect to the database: ${error}`);
  }
}
