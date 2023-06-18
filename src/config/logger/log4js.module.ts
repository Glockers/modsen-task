


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

export const createConfigLogger = () => {
  return {
    loggingLevel,
    contextName,
    configLogger
  };
};
