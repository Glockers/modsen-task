import { Sequelize } from 'sequelize';
import * as pg from 'pg';

const URL = String(process.env.POSTGRES_URL);

export const sequelizeConnection = new Sequelize(URL, {
  dialectModule: pg
});

export async function checkDatabaseConnection() {
  try {
    await sequelizeConnection.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}
