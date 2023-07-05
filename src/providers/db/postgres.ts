import { DataSource, DataSourceOptions } from 'typeorm';
import { typeormConfig } from '../../config/db.config';
import { appConfig } from '../../config';
import { SeederOptions } from 'typeorm-extension';

const options: DataSourceOptions & SeederOptions = {
  type: typeormConfig.TYPEORM_CONNECTION,
  host: typeormConfig.TYPEORM_HOST,
  port: typeormConfig.TYPEORM_PORT,
  username: typeormConfig.TYPEORM_USERNAME,
  password: typeormConfig.TYPEORM_PASSWORD,
  database: typeormConfig.TYPEORM_DATABASE,
  logging: typeormConfig.TYPEORM_LOGGING,
  synchronize: typeormConfig.TYPEORM_SYNCHRONIZE,
  entities: appConfig.APP_NODE_ENV === 'production' ? typeormConfig.productionEntityPath : typeormConfig.developEntityPath,
  migrations: typeormConfig.migrationsPath,
  migrationsTableName: typeormConfig.migrationsTableName,
  factories: typeormConfig.factories,
  seeds: typeormConfig.seeds
};

export const PostgresDataSource = new DataSource(options);
