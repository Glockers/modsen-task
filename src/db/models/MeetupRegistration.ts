import { DataTypes, Model } from 'sequelize';
import { sequelizeConnection } from '../config/db.config';
import User from './User';
import Meetup from './Meetup';

export interface IMeetupRegistrationAttributes {
  id: number;
  registrationDate: Date;
}

class MeetupRegistration extends Model<IMeetupRegistrationAttributes, any> implements IMeetupRegistrationAttributes {
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

MeetupRegistration.beforeCreate(
  async (registration) => {
    registration.registrationDate = new Date();
  }
);

User.belongsToMany(Meetup, { through: MeetupRegistration });
Meetup.belongsToMany(User, { through: MeetupRegistration });

export default MeetupRegistration;