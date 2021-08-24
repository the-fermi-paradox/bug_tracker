const db = require('../../database');

const model = (() => {
  const create = async (data) => await db.ask(
    'INSERT INTO comments(description, ticket_id, user_id) VALUES(?, ?, ?);',
    [data.description, data.ticket_id, data.user_id],
  );
  // There's no risk of SQL injection here - key is validated beforehand in
  // middleware
  const update = async (id, key, value) => await db.ask(`UPDATE comments SET ${key}=(?) WHERE id=(?);`, [value, id]);
  const get = async (id) => await db.ask(
    'SELECT comments.*, users.user_name FROM comments LEFT JOIN users ON comments.user_id = users.id WHERE comments.ticket_id=(?) AND comments.inactive=FALSE',
    [id],
  );
  const list = async () => await db.ask('SELECT * FROM comments');
  const remove = async (id) => await db.ask('UPDATE comments SET inactive=TRUE WHERE id=(?)', [id]);

  return {
    create,
    list,
    get,
    update,
    remove,
  };
})();

module.exports = model;
