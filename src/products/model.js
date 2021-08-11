const db = require('../../database');

const model = (() => {
  const create = async (data) => await db.ask('INSERT INTO products(title, maintainer_id) VALUES(?, ?);', [
    data.title,
    data.maintainer_id,
  ]);
  // There's no risk of SQL injection here
  // key is validated beforehand in middleware
  const update = async (id, key, value) => await db.ask(`UPDATE products SET ${key}=(?) WHERE id=(?);`, [value, id]);
  const get = async (id) => await db.ask('SELECT * FROM products WHERE id=(?)', [id]);
  const list = async () => {
    const query = `SELECT t2.title,
    SUM(state = 'OPEN') open_count,
    SUM(state = 'CLOSED') closed_count
    FROM tickets AS t1
    INNER JOIN products AS t2
    ON t1.product_id = t2.id;`;
    return await db.ask(query);
  };
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
