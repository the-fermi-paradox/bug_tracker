const model = require('./bugModel');
// Our controllers should:
// 1. send the relevant request to our model
// 2. bundle the response and return it, sending to router

exports.list = () => {
  const res = model.listBugs();
  return res;
};

exports.detail = (data) => {
  const res = model.getBug(data);
  return res;
};

exports.create = (data) => {
  const res = model.createBug(data);
  return res;
};

exports.delete = (data) => {
  const res = model.deleteBug(data);
  return res;
};

exports.update = (data) => {
  const res = [];
  Object.entries(data).forEach(([key, value]) => {
    if (value) res.push(model.updateBug(key, value));
  });
  return res;
};
