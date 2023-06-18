import { Sequelize } from 'sequelize';



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
