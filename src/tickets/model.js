const db = require('../../database');
const schema = require('./schema');

const ticketModel = (() => {
  const createBug = async (data) => {
    schema.validate(data);
    return await db.query(
      'INSERT INTO bugs(bug_priority, bug_severity, bug_type, bug_reporter_id, bug_product_id) VALUES(?, ?, ?, ?, ?, ?, ?)',
      data.priority,
      data.severity,
      data.type,
      data.reporterId,
      data.productId,
    );
  };

  const updateBug = async (key, value) => await db.query('UPDATE bugs SET (?) = (?);', key, value);

  const getBug = async (id) => await db.query('SELECT * FROM bugs WHERE id=(?)', [id]);

  const listBugs = async () => await db.query('SELECT * FROM bugs');

  const deleteBug = async (id) => await db.query('DELETE * FROM bugs WHERE id=(?)', [id]);

  return {
    createBug,
    updateBug,
    getBug,
    listBugs,
    deleteBug,
  };
})();

module.exports = ticketModel;
