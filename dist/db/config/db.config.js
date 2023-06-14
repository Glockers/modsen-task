"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkDatabaseConnection = exports.sequelizeConnection = void 0;
const sequelize_1 = require("sequelize");
const dbName = process.env.POSTGRES_DB;
const dbUser = process.env.POSTGRES_USER;
const dbHost = process.env.POSTGRES_HOST;
const dbDriver = process.env.POSTGRES_DIALECT;
const dbPassword = process.env.POSTGRES_PASSWORD;
const dbPort = Number(process.env.POSTGRES_PORT);
const isLogging = process.env.LOG_DB === 'true';
exports.sequelizeConnection = new sequelize_1.Sequelize(dbName, dbUser, dbPassword, {
    host: dbHost,
    dialect: dbDriver,
    port: dbPort || 5432,
    logging: isLogging
});
function checkDatabaseConnection() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield exports.sequelizeConnection.authenticate();
            console.log('Connection has been established successfully.');
        }
        catch (error) {
            console.error('Unable to connect to the database:', error);
        }
    });
}
exports.checkDatabaseConnection = checkDatabaseConnection;
//# sourceMappingURL=db.config.js.map