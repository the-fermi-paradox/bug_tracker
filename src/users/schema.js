const joi = require('joi');

const schema = (() => {
  const create = joi
    .object({
      // All users should have a name
      user_name: joi.string().alphanum().min(3).max(60)
        .required(),

      // ALl users should have a role
      user_role: joi.string().alphanum().min(3).max(2000)
        .required(),
    })
    .max(2);

  const update = joi
    .object({
      // Update is the same as create, but none of the parameters are required
      user_name: joi.string().alphanum().min(3).max(60),
      user_role: joi.string().alphanum().min(3).max(2000),
    })
    .min(1)
    .max(2);
  return {
    create,
    update,
  };
})();

module.exports = schema;
