const model = require('./model');
// Our controllers should:
// 1. send the relevant request to our model
// 2. bundle the response and return it, sending to router

const ticketController = (() => {
  const list = async () => {
    const res = await model.listBugs();
    return res;
  };

  const detail = async (data) => {
    const res = await model.getBug(data);
    return res;
  };

  const create = async (data) => {
    const res = await model.createBug(data);
    return res;
  };

  const remove = async (data) => {
    const res = await model.deleteBug(data);
    return res;
  };

  const update = async (data) => {
    const promises = Object.entries(data).map(([key, value]) => model.updateBug(key, value));
    const res = await Promise.all(promises);
    return res;
  };

  return {
    list,
    detail,
    create,
    remove,
    update,
  };
})();

module.exports = ticketController;
