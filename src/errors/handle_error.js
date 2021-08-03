const logger = require('../helpers/logger');

const crashOrRespond = (err, res) => {
  const { isOperational, statusCode, message } = err;
  // If we have a response, send one now
  if (res) {
    res.status(statusCode ?? 500).json({
      status: 'error',
      statusCode: statusCode ?? 500,
      message,
    });
  }
  // Exit the process with a failed error code if this is a programmer error
  if (!isOperational) {
    process.exit(1);
  }
};

const handleError = (err, res) => {
  // Log our error
  logger.error(err);
  crashOrRespond(err, res);
};

module.exports = handleError;
