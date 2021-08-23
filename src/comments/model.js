const db = require('../../database');

const model = (() => {
  const create = async (data) => await db.ask(
    'INSERT INTO comments(description, ticket_id, user_id) VALUES(?, ?, ?);',
    [data.description, data.ticket_id, data.user_id],
  );
  // There's no risk of SQL injection here - key is validated beforehand in
  // middleware
  const update = async (id, key, value) => await db.ask(`UPDATE comments SET ${key}=(?) WHERE id=(?);`, [value, id]);
  const get = async (id) => await db.ask('SELECT * FROM comments WHERE ticket_id=(?)', [id]);
  const list = async () => await db.ask('SELECT * FROM comments');
  const remove = async (id) => await db.ask('DELETE * FROM comments WHERE id=(?)', [id]);

  return {
    create,
    list,
    get,
    update,
    remove,
  };
})();

module.exports = model;
