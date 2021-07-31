const joi = require('joi');

const ticketSchema = joi.object({
  // All tickets should have a title
  title: joi.string().alphanum().min(3).max(60)
    .required(),

  // ALl tickets should have a description
  description: joi.string().alphanum().min(3).max(2000)
    .required(),

  // All tickets should have a priority describing their urgency to developers
  priority: joi.number().integer().min(0).max(5)
    .required(),

  // All tickets should have a severity describing their impact on the UX
  severity: joi.number().integer().min(0).max(5)
    .required(),

  // All tickets should have a flavor (called type in userland)
  flavor: joi.string().alphanum().min(3).max(60)
    .required(),

  // All tickets should be associated with a user ID as the reporter
  reporter_id: joi.number().integer().required(),

  // All tickets should be part of a broader product
  product_id: joi.number().integer().required(),
});

module.exports = ticketSchema;
