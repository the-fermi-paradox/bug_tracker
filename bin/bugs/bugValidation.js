const joi = require('joi');

const BugSchema = joi.object({
  title: joi.string().alphanum().min(3).max(60)
    .required(),

  priority: joi.number().integer().min(0).max(5)
    .required(),

  severity: joi.number().integer().min(0).max(5)
    .required(),

  type: joi.string().alphanum().min(3).max(60)
    .required(),

  reporter_id: joi.number().integer().required(),

  assignee_id: joi.number().integer().required(),

  product_id: joi.number().integer().required(),
});

module.exports = BugSchema;
