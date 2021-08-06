const joi = require('joi');

const schema = (() => {
  const create = joi
    .object({
      // All products should have a title
      title: joi.string().alphanum().min(3).max(60)
        .required(),

      // All products should have a maintainer
      maintainer_id: joi.number().integer().required(),
    })
    .max(2);

  const update = joi
    .object({
      // Update is the same as create, but none of the parameters are required
      title: joi.string().alphanum().min(3).max(60),
      maintainer_id: joi.number().integer(),
    })
    .min(1)
    .max(2);
  return {
    create,
    update,
  };
})();

module.exports = schema;
