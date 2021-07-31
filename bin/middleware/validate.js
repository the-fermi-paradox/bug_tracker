const joi = require('joi');
const handleError = require('../errors/handleError');

const validate = (schema) => (req, res, next) => {
  const { error } = joi.validate(req.body, schema);
  if (error != null) {
    next();
  } else {
    handleError(error);
  }
};

module.exports = validate;
