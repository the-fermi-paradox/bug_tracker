const pino = require('pino');

const logger = pino({
  customLevels: {
    http: 10,
    db: 20,
    info: 30,
    warn: 40,
    error: 50,
    fatal: 60,
  },
  useOnlyCustomLevels: true,
  level: 'http',
});

module.exports = logger;
