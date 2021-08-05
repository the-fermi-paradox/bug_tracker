const db = require('../../database');

const model = (() => {
  const create = async (data) => await db.ask('INSERT INTO users(user_name, user_role) VALUES(?, ?);', [
    data.user_name,
    data.user_role,
  ]);
  // There's no risk of SQL injection here - key is validated beforehand in
  // middleware
  const update = async (id, key, value) => await db.ask(`UPDATE users SET ${key}=(?) WHERE id=(?);`, [value, id]);
  const get = async (id) => await db.ask('SELECT * FROM users WHERE id=(?)', [id]);
  const list = async () => await db.ask('SELECT * FROM users');
  const remove = async (id) => await db.ask('DELETE * FROM users WHERE id=(?)', [id]);

  return {
    create,
    list,
    get,
    update,
    remove,
  };
})();

module.exports = model;
