const db = require('../../database');

const model = (() => {
  const create = async (data) => {
    const query = await db.ask(
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

    return await query;
  };
  const update = async (id, key, value) => {
    const query = await db.ask('UPDATE tickets SET (?) = (?) WHERE id=(?);', [
      key,
      value,
      id,
    ]);

    return await query;
  };
  const get = async (id) => {
    const query = await db.ask('SELECT * FROM tickets WHERE id=(?)', [id]);

    return await query;
  };
  const list = async () => {
    const query = await db.ask('SELECT * FROM tickets');

    return await query;
  };

  const sum = async () => {
    const query = await db.ask(`SELECT SUM(state = 'OPEN') open_count,
    SUM(state = 'CLOSED') closed_count`);

    return await query;
  };
  const remove = async (id) => {
    const query = await db.ask('DELETE * FROM tickets WHERE id=(?)', [id]);

    return await query;
  };

  return {
    create,
    list,
    sum,
    get,
    update,
    remove,
  };
})();

module.exports = model;
