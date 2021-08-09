const service = require('./service');
const DBError = require('../errors/db_error');

const controller = (() => {
  const list = async (req, res, next) => {
    const data = await service.list().catch((err) => next(new DBError(err)));
    res.json(data);
  };

  const get = async (req, res, next) => {
    const { id } = req.params;
    const data = await service.get(id).catch((err) => next(new DBError(err)));
    res.json(data);
  };

  const create = async (req, res, next) => {
    // If validated, extract out the relevant data
    const input = {
      title: req.body.title,
      description: req.body.description,
      flavor: req.body.flavor,
      priority: req.body.priority,
      severity: req.body.priority,
      reporter_id: req.body.reporter_id,
      product_id: req.body.product_id,
    };

    // Submit it to our service and await the response
    const data = await service
      .create(input)
      .catch((err) => next(new DBError(err)));
    // Send the JSON to the client
    res.json(data);
  };

  const remove = async (req, res, next) => {
    const { id } = req.params;
    const data = await service
      .remove(id)
      .catch((err) => next(new DBError(err)));
    res.json(data);
  };

  const update = async (req, res, next) => {
    const { id } = req.params;
    const input = {
      title: req.body.title,
      description: req.body.description,
      flavor: req.body.flavor,
      priority: req.body.priority,
      severity: req.body.priority,
      reporter_id: req.body.reporter_id,
      product_id: req.body.product_id,
    };
    const data = await service
      .update(id, input)
      .catch((err) => next(new DBError(err)));
    res.json(data);
  };

  return {
    list,
    get,
    create,
    remove,
    update,
  };
})();

module.exports = controller;
