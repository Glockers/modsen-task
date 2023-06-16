import { DataTypes, HasManyAddAssociationMixin, Model } from 'sequelize';
import { sequelizeConnection } from '../../../db/config';
import Meetup from '../../meetup/entities/meetup.entity';

export interface IUserAttributes {
  id: number;
  login: string;
  password: string;
  role: string;
}

export type IUserInput = Omit<IUserAttributes, 'id'>

export type IAuthCredentials = Omit<IUserAttributes, 'id' | 'role'>

class User extends Model<IUserAttributes, IUserInput> implements IUserAttributes {
  public id!: number;
  public login!: string;
  public password!: string;
  public role!: string;
  public addMeetup!: HasManyAddAssociationMixin<Meetup, number>;
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
