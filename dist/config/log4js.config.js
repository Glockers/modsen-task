"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createConfigLogger = void 0;
const loggingLevel = process.env.LOG_LEVEL || 'debug';
const contextName = 'context';
const configLogger = {
    appenders: {
        out: {
            type: 'stdout',
            layout: {
                type: 'pattern',
                pattern: `%[[%d{dd/MM/yy hh:mm:ss} %X{${contextName}}] [%p]%] %m`
            }
        }
    },
    categories: { default: { appenders: ['out'], level: loggingLevel } }
};
const createConfigLogger = () => {
    return {
        loggingLevel,
        contextName,
        configLogger
    };
};
exports.createConfigLogger = createConfigLogger;
//# sourceMappingURL=log4js.config.js.map