const db = require('../../database');

const model = (() => {
  const create = async (data) => {
    const connection = await db.connect();
    const query = await connection.query(
      'INSERT INTO tickets(title, description, flavor, priority, severity, reporter_id, product_id) VALUES(?, ?, ?, ?, ?, ?, ?)',
      [
        data.title,
        data.description,
        data.flavor,
        data.priority,
        data.severity,
        data.reporter_id,
        data.product_id,
      ],
    );
    db.close(connection);

    return await query;
  };
  const update = async (id, key, value) => {
    const connection = await db.connect();
    const query = await connection.query(
      'UPDATE tickets SET (?) = (?) WHERE id=(?);',
      [key, value, id],
    );
    db.close(connection);

    return await query;
  };
  const get = async (id) => {
    const connection = await db.connect();
    const query = await connection.query('SELECT * FROM tickets WHERE id=(?)', [
      id,
    ]);
    db.close(connection);

    return await query;
  };
  const list = async () => {
    const connection = await db.connect();
    const query = await connection.query('SELECT * FROM tickets');
    db.close(connection);

    return await query;
  };
  const remove = async (id) => {
    const connection = await db.connect();
    const query = await connection.query('DELETE * FROM tickets WHERE id=(?)', [
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
