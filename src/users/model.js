const db = require('../../database');

const model = (() => {
  const create = async (data) => {
    const connection = await db.connect();
    const query = await connection.query(
      'INSERT INTO users(user_name, user_role) VALUES(?, ?);',
      [data.user_name, data.user_role],
    );
    db.close(connection);

    return await query;
  };
  const update = async (id, key, value) => {
    const connection = await db.connect();
    // Key is checked by validation earlier; it is up to the server, so we
    // should be able to use it as a template here without any escaping
    const query = await connection.query(
      `UPDATE users SET ${key}=(?) WHERE id=(?);`,
      [value, id],
    );
    db.close(connection);

    return await query;
  };
  const get = async (id) => {
    const connection = await db.connect();
    const query = await connection.query('SELECT * FROM users WHERE id=(?)', [
      id,
    ]);
    db.close(connection);

    return await query;
  };
  const list = async () => {
    const connection = await db.connect();
    const query = await connection.query('SELECT * FROM users');
    db.close(connection);

    return await query;
  };
  const remove = async (id) => {
    const connection = await db.connect();
    const query = await connection.query('DELETE * FROM users WHERE id=(?)', [
      id,
    ]);
    db.close(connection);

    return await query;
  };

  return {
    create,
    list,
    get,
    update,
    remove,
  };
})();

module.exports = model;
