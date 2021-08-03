const service = require('./service');
const schema = require('./schema');
const processJoiError = require('../errors/process_joi_error');
const HTTPError = require('../errors/http_error');
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
    const { error } = schema.create.validate(req.body);
    // If we failed to validate the data
    if (error != null) {
      // Send it to our error middleware
      next(processJoiError(error));
    }
    // If validated, extract out the relevant data
    const input = {
      user_name: req.body.user_name,
      user_role: req.body.user_role,
    };
    // Submit it to our service and await the response
    const data = await service.create(input).catch((e) => next(new DBError(e)));
    // Send the JSON to the client
    res.json(data);
  };

  const remove = async (req, res, next) => {
    const { id } = req.params;
    if (!id) next(new HTTPError(400, 'No id specified'));
    const data = await service
      .remove(id)
      .catch((err) => next(new DBError(err)));
    res.json(data);
  };

  const update = async (req, res, next) => {
    const { id } = req.params;
    if (!id) next(new HTTPError(400, 'No id specified'));
    const { error } = schema.update.validate(req.body);
    // If we failed to validate the data
    if (error != null) {
      // Send it to our error middleware
      next(processJoiError(error));
    }

    const input = {
      user_name: req.body.user_name,
      user_role: req.body.user_role,
    };

    const data = await service
      .update(id, input)
      .catch((e) => next(new DBError(e)));
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
