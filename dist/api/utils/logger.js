"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const log4js_1 = __importDefault(require("log4js"));
const path_1 = __importDefault(require("path"));
const log4js_config_1 = require("../../config/log4js.config");
const config = (0, log4js_config_1.createConfigLogger)();
const createLogger = (context) => {
    log4js_1.default.configure(config.configLogger);
    const logger = log4js_1.default.getLogger();
    logger.addContext(config.contextName, path_1.default.relative('src', context));
    logger.level = config.contextName;
    return logger;
};
exports.default = createLogger;
//# sourceMappingURL=logger.js.map