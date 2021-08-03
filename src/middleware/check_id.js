const joi = require('joi');
const HTTPError = require('../errors/http_error');

// Check if a valid id was provided; if not, go to error middleware
const checkId = (req, res, next) => {
  const { id } = req.params;
  // Does the id exist?
  if (!id) return next(new HTTPError(400, 'No id specified'));

  // Is the id valid? ids are positive integers
  const { err } = joi.number().integer().sign('positive').validate(id);
  console.log(joi.number().integer.sign('positive').validate(id);
  if (err != null) return next(new HTTPError(400, 'invalid id - does item exist?'));

  // All checks passed; let's go
  next();
};

module.exports = checkId;
