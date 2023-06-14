"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const db_config_1 = require("./config/db.config");
const Meetup_1 = __importDefault(require("./models/Meetup"));
const User_1 = __importDefault(require("./models/User"));
const isDev = true;
const dbInit = () => Promise.all([
    isDev ? (0, db_config_1.checkDatabaseConnection)() : undefined,
    Meetup_1.default.sync({ alter: isDev }),
    User_1.default.sync({ alter: isDev })
]);
exports.default = dbInit;
//# sourceMappingURL=init.js.map