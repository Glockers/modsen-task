import { DataTypes, Model } from 'sequelize';
import { sequelizeConnection } from '../config/db.config';

interface IMeetupAttributes {
  id: number;
  title: string;
  description?: string;
  tags: string[];
  location: string;
  datetime: Date;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}

class Meetup extends Model<IMeetupAttributes, any> implements IMeetupAttributes {
  public id!: number;
  public title!: string;
  public description?: string;
  public location!: string;
  public datetime!: Date;
  public tags!: string[];

  // timestamps
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
  public readonly deletedAt!: Date;
}

Meetup.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT
    },
    tags: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      defaultValue: []
    },
    datetime: {
      type: DataTypes.DATE
    },
    location: {
      type: DataTypes.STRING
    }
  },
  {
    sequelize: sequelizeConnection,
    modelName: 'Meetup',
    paranoid: true
  }
);

export default Meetup;
