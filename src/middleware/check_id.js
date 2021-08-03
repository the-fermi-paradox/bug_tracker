const joi = require('joi');
const HTTPError = require('../errors/http_error');
const processJoiError = require('../errors/process_joi_error');

// Check if a valid id was provided; if not, go to error middleware
const checkId = (req, res, next) => {
  const { id } = req.params;
  // Does the id exist?
  if (!id) return next(new HTTPError(400, 'No id specified'));

  // Is the id valid? ids are positive integers
  const { error } = joi.number().integer().sign('positive').validate(id);
  if (error != null) return next(processJoiError(error));

  // All checks passed; let's go
  next();
};

module.exports = checkId;
