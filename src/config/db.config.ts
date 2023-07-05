import Joi from 'joi';
import { validateConfig } from '../common/utils/validateConfig';
import { UsersFactory } from '../database/factories/user.factory';
import { MeetupFactory } from '../database/factories/meetup.factory';
import { UserSeeder } from '../database/seeds/user.seed';
import { MeetupSeeder } from '../database/seeds/meetup.seed';

interface IPostgreConfig {
  TYPEORM_HOST: string,
  TYPEORM_PORT: number,
  TYPEORM_USERNAME: string,
  TYPEORM_PASSWORD: string,
  TYPEORM_CONNECTION: 'postgres' | 'mysql';
  TYPEORM_DATABASE: string,
  TYPEORM_SYNCHRONIZE: boolean,
  TYPEORM_LOGGING: boolean,
}
const productionEntityPath = ['dist/**/*.entity.js'];
const developEntityPath = ['src/**/*.entity.ts'];
const migrationsPath = ['src/database/migrations/*{.ts,.js}'];
const migrationsTableName = 'migrations';
const factories = [UsersFactory, MeetupFactory];
const seeds = [UserSeeder, MeetupSeeder];

const validationSchema = Joi.object({
  TYPEORM_DATABASE: Joi.string().required(),
  TYPEORM_PORT: Joi.number().min(80).max(9999).required(),
  TYPEORM_HOST: Joi.string().default('http://localhost').required(),
  TYPEORM_USERNAME: Joi.string().required(),
  TYPEORM_PASSWORD: Joi.string().required(),
  TYPEORM_LOGGING: Joi.boolean().default(false).required(),
  TYPEORM_SYNCHRONIZE: Joi.boolean().default(true).required(),
  TYPEORM_CONNECTION: Joi.string().default('postgres').required()
}).unknown();

export const typeormConfig = { ...validateConfig<IPostgreConfig>(validationSchema), productionEntityPath, developEntityPath, migrationsPath, migrationsTableName, factories, seeds };
