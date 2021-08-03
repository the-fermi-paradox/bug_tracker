const processJoiError = require('../errors/process_joi_error');

const validate = (schema) => (req, res, next) => {
  const { error } = schema.validate(req.body);
  if (error != null) {
    next();
  } else {
    next(processJoiError(error));
  }
};

module.exports = validate;
