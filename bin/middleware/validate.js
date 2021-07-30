const joi = require('joi');
const logger = require('pino')();

const validate = (schema) => (req, res, next) => {
  const { error } = joi.validate(req.body, schema);
  if (error != null) {
    next();
  } else {
    handleError(error);
  }
};

module.exports = validate;
