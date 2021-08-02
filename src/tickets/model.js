const db = require('../../database');

const model = (() => {
  const create = async (data) => {
    const connection = await db.connect();
    const query = await connection.query(
      'INSERT INTO bugs(bug_priority, bug_severity, bug_type, bug_reporter_id, bug_product_id) VALUES(?, ?, ?, ?, ?, ?, ?)',
      data.priority,
      data.severity,
      data.type,
      data.reporterId,
      data.productId,
    );
    db.close(connection);

    return await query;
  };
  const update = async (key, value) => {
    const connection = await db.connect();
    const query = await connection.query(
      'UPDATE bugs SET (?) = (?);',
      key,
      value,
    );
    db.close(connection);

    return await query;
  };
  const get = async (id) => {
    const connection = await db.connect();
    const query = await connection.query('SELECT * FROM bugs WHERE id=(?)', [
      id,
    ]);
    db.close(connection);

    return await query;
  };
  const list = async () => {
    const connection = await db.connect();
    const query = await connection.query('SELECT * FROM bugs');
    db.close(connection);

    return await query;
  };
  const remove = async (id) => {
    const connection = await db.connect();
    const query = await connection.query('DELETE * FROM bugs WHERE id=(?)', [
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
