import { Sequelize } from 'sequelize';

const dbName = String(process.env.POSTGRESS_DATABASE);
const dbUser = String(process.env.POSTGRESS_USER);
const dbHost = process.env.POSTGRESS_HOST;
const dbPassword = String(process.env.POSTGRESS_PASSWORD);
const isLogging = process.env.LOG_DB === 'true';
const isProduction = process.env.NODE_ENV === 'production';

export const sequelizeConnection = new Sequelize(dbName, dbUser, dbPassword, {
  host: dbHost,
  dialect: 'postgres',
  dialectOptions: {
    ssl: isProduction && {
      require: true
    }
  },
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
