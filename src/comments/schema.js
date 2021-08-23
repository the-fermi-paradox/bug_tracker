const joi = require('joi');

const schema = (() => {
  const create = joi
    .object({
      description: joi.string().min(3).max(2000).required(),
      user_id: joi.number().integer().required(),
      ticket_id: joi.number().integer().required(),
    })
    .max(3);

  const update = joi
    .object({
      description: joi.string().min(3).max(2000).required(),
    })
    .min(1)
    .max(1);
  return {
    create,
    update,
  };
})();

module.exports = schema;
