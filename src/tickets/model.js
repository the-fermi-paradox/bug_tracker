const db = require('../../database');

const model = (() => {
  // The due date can be null, so we modify our query based on the input
  const create = async (data) => {
    const parameterArray = [
      data.title,
      data.description,
      data.flavor,
      data.priority,
      data.severity,
      data.reporter_id,
      data.product_id,
    ];
    let parameterString = 'title, description, flavor, priority, severity, reporter_id, product_id';
    let questionString = '?, ?, ?, ?, ?, ?, ?';
    if (data.due_date) {
      parameterArray.push(data.due_date);
      parameterString += ', due_date';
      questionString += ', ?';
    }
    const query = await db.ask(
      `INSERT INTO tickets(${parameterString}) 
        VALUES(${questionString})`,
      parameterArray,
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
    const query = await db.ask(
      'SELECT tickets.*, users.id AS user_id, users.user_name FROM tickets LEFT JOIN users ON tickets.reporter_id = users.id WHERE tickets.id=(?)',
      [id],
    );

    return await query;
  };
  const list = async () => {
    const query = await db.ask('SELECT * FROM tickets');

    return await query;
  };

  const sum = async () => {
    const query = await db.ask(`SELECT SUM(state = 'OPEN') open_count,
    SUM(state = 'CLOSED') closed_count
    FROM tickets;`);

    return await query;
  };

  const byProduct = async (id) => {
    const query = await db.ask(`SELECT * FROM tickets WHERE product_id=${id}`);
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
    byProduct,
    get,
    update,
    remove,
  };
})();

module.exports = model;
