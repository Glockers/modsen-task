import { BelongsToManyAddAssociationMixin, DataTypes, Model } from 'sequelize';
import { sequelizeConnection } from '../config';
import Meetup from './Meetup';

export interface IUserAttributes {
  id: number;
  login: string;
  password: string;
  role: string;
}

export type IUserCreate = Omit<IUserAttributes, 'id'>

export type IAuthCredentials = Omit<IUserAttributes, 'id' | 'role'>

class User extends Model<IUserAttributes, any> implements IUserAttributes {
  public id!: number;
  public login!: string;
  public password!: string;
  public role!: string;
  public addMeetup!: BelongsToManyAddAssociationMixin<Meetup, any>;
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    login: {
      type: DataTypes.STRING,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false
    }
  },
  {
    sequelize: sequelizeConnection,
    modelName: 'User'
  }
);

export default User;
