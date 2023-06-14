"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const db_config_1 = require("../config/db.config");
class Meetup extends sequelize_1.Model {
}
Meetup.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    title: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: sequelize_1.DataTypes.TEXT
    },
    tags: {
        type: sequelize_1.DataTypes.ARRAY(sequelize_1.DataTypes.STRING),
        defaultValue: []
    },
    datetime: {
        type: sequelize_1.DataTypes.DATE
    },
    location: {
        type: sequelize_1.DataTypes.STRING
    }
}, {
    sequelize: db_config_1.sequelizeConnection,
    modelName: 'Meetup'
});
exports.default = Meetup;
//# sourceMappingURL=Meetup.js.map