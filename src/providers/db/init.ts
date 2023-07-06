
import { AppError } from '../../common/exceptions';
import { createLogger } from '../../common/utils';
import { PostgresDataSource } from './postgres';

const logger = createLogger(__filename);

async function checkPostgressConnection(): Promise<void> {
  await PostgresDataSource.initialize();
  logger.info('Connection has been established successfully.');
}

export function initDatabase(startServer: Function): void {
  checkPostgressConnection().then(() => {
    startServer();
  }).catch((error) => {
    throw AppError.InternalServerError(`Unable to connect to the database: ${error}`);
  });
}
