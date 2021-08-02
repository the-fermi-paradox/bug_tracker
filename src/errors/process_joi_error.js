const HTTPError = require('./http_error');

const processJoiError = (err) => {
  const { details } = err;
  // Create our message
  const message = details.map((i) => i.message).join(',');
  // Create a response
  return new HTTPError(message, 400);
};

module.exports = processJoiError;
