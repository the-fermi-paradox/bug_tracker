const DBError = require('../errors/db_error');
const model = require('./model');

// Our service will handle any specific business logic;
// for now it just calls the database

const service = (() => {
  const create = async (data) => await model.create(data);

  const list = async () => await model.list();

  const get = async (id) => await model.get(id);

  const update = async (id, data) => {
    const promises = Object.entries(data)
      .filter(([key, value]) => value ?? false)
      .map(([key, value]) => model.update(id, key, value));
    const query = await Promise.all(promises);
    return await query;
  };

  const remove = async (id) => await model.remove(id);

  return {
    create,
    list,
    get,
    update,
    remove,
  };
})();

module.exports = service;
