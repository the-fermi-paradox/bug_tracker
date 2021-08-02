const DBError = require('../errors/db_error');
const model = require('./model');

// Our service will handle any specific business logic;
// for now it just calls the database

const service = (() => {
  const create = async (data) => await model.create(data).catch((err) => {
    throw new DBError(err);
  });

  const list = async () => await model.list().catch((err) => {
    throw new DBError(err);
  });

  const get = async (id) => await model.get(id).catch((err) => {
    throw new DBError(err);
  });

  const update = async (id, data) => {
    const promises = Object.entries(data).map(([key, value]) => model.update(id, key, value));
    const query = await Promise.all(promises).catch((err) => {
      throw new DBError(err);
    });
    return await query;
  };

  const remove = async (id) => await model.remove(id).catch((err) => {
    throw new DBError(err);
  });

  return {
    create,
    list,
    get,
    update,
    remove,
  };
})();

module.exports = service;
