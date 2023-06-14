import { DataTypes, Model } from 'sequelize';
import { sequelizeConnection } from '../config';

export interface IUserAttributes {
  id: number;
  login: string;
  password: string;
  role: string;
}

class User extends Model<IUserAttributes, any> implements IUserAttributes {
  public id!: number;
  public login!: string;
  public password!: string;
  public role!: string;
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
