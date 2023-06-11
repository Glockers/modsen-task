import { Dialect, Sequelize } from 'sequelize';

const dbName = process.env.POSTGRES_DB as string;
const dbUser = process.env.POSTGRES_USER as string;
const dbHost = process.env.POSTGRES_HOST;
const dbDriver = process.env.POSTGRES_DIALECT as Dialect;
const dbPassword = process.env.POSTGRES_PASSWORD;
const dbPort = Number(process.env.POSTGRES_PORT);
const isLogging = process.env.LOG_DB === 'true';

export const sequelizeConnection = new Sequelize(dbName, dbUser, dbPassword, {
  host: dbHost,
  dialect: dbDriver,
  port: dbPort || 5432,
  logging: isLogging
});

export async function checkDatabaseConnection() {
  try {
    await sequelizeConnection.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}
