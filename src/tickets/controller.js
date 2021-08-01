const model = require('./model');
// Our controllers should:
// 1. send the relevant request to our model
// 2. bundle the response and return it, sending to router

const controller = (() => {
  const list = async (req, res, next) => {
    const data = await model.listBugs().catch(next);
    next(data);
  };

  const detail = async (req, res, next) => {
    const data = await model.getBug().catch(next);
    next(data);
  };

  const create = async (req, res, next) => {
    const data = await model.createBug().catch(next);
    next(data);
  };

  const remove = async (req, res, next) => {
    const data = await model.deleteBug().catch(next);
    next(data);
  };

  const update = async (req, res, next) => {
    const promises = Object.entries().map(([key, value]) => model.updateBug(key, value));
    const data = await Promise.all(promises).catch(next);
    next(data);
  };

  return {
    list,
    detail,
    create,
    remove,
    update,
  };
})();

module.exports = controller;
