const model = require('./model');

// Our service will handle any specific business logic;
// for now it's just a wrapper for calls to the database

const service = (() => {
  const create = async (data) => await model.create(data);
  const list = async () => await model.list();
  const sum = async () => await model.sum();
  const byProduct = async (id) => await model.byProduct(id);
  const get = async (id) => await model.get(id);
  const update = async (id, data) => {
    const promises = Object.entries(data).map(([key, value]) => model.update(id, key, value));
    const query = await Promise.all(promises);
    return await query;
  };
  const remove = async (id) => await model.remove(id);

  return {
    create,
    list,
    sum,
    byProduct,
    get,
    update,
    remove,
  };
})();

module.exports = service;
