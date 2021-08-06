const db = require('../../database');

const model = (() => {
  const create = async (data) => await db.ask('INSERT INTO products(title, maintainer_id) VALUES(?, ?);', [
    data.title,
    data.maintainer_id,
  ]);
  // There's no risk of SQL injection here - key is validated beforehand in
  // middleware
  const update = async (id, key, value) => await db.ask(`UPDATE products SET ${key}=(?) WHERE id=(?);`, [value, id]);
  const get = async (id) => await db.ask('SELECT * FROM products WHERE id=(?)', [id]);
  const list = async () => await db.ask('SELECT * FROM products');
  const remove = async (id) => await db.ask('DELETE * FROM products WHERE id=(?)', [id]);

  return {
    create,
    list,
    get,
    update,
    remove,
  };
})();

module.exports = model;
