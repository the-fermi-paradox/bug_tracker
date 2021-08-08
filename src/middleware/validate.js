const processJoiError = require('../errors/process_joi_error');

const validate = (schema) => (req, res, next) => {
  console.log(req.body);
  const { value, error } = schema.validate(req.body);
  console.log(value);
  error != null ? next(processJoiError(error)) : next();
};

module.exports = validate;
