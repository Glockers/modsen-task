import { DataTypes, Model, Optional } from 'sequelize';
import { sequelizeConnection } from '../config/db.config';
import User from './User';
import Meetup from './Meetup';

export interface IMeetupRegistrationAttributes {
  id: number;
  registrationDate: Date;
}

export interface IMeetupRegistrationInput extends Optional<IMeetupRegistrationAttributes, 'id'> { }
export interface IMeetupRegistrationOutput extends IMeetupRegistrationAttributes { }

class MeetupRegistration extends Model<IMeetupRegistrationAttributes, IMeetupRegistrationInput> implements IMeetupRegistrationAttributes {
  public id!: number;
  public registrationDate!: Date;
}

MeetupRegistration.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    registrationDate: {
      type: DataTypes.DATE,
      allowNull: false
    }
  },
  {
    sequelize: sequelizeConnection,
    modelName: 'MeetupRegistration'
  }
);

User.belongsToMany(Meetup, { through: MeetupRegistration });
Meetup.belongsToMany(User, { through: MeetupRegistration });

export default MeetupRegistration;
