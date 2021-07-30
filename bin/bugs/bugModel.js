const mariadb = require('mariadb');
const schema = require('./bugValidation');
const HTTPError = require('../errors/HTTPError');

// SCHEMA:
// bugs table:
// bug_id int(11) not null primary key auto increment
// bug_priority int(11) not null
// bug_severity int(11) not null
// bug_type varchar(60) not null
// bug_reporter_id int(11) not null foreign key -> users
// bug_assignee_id int(11) not null foreign key -> users
// bug_product_id int(11) not null foreign key -> products
// created timestamp not null default 0000-00-00 00:00:00

const BugModel = (async () => {
  const db = await mariadb
    .createConnection({
      socketPath: '/run/mysqld/mysqld.sock',
      user: 'root',
      database: 'bugtracker',
    })
    .then((connection) => {
      module.exports = connection;
    })
    .catch((err) => {
      throw new HTTPError(500, err);
    });

  const createBug = async (data) => {
    const now = Date.now();
    schema.validate(data);
    return db.query(
      'INSERT INTO bugs(bug_priority, bug_severity, bug_type, bug_reporter_id, bug_assignee_id, bug_product_id, created) VALUES(?, ?, ?, ?, ?, ?, ?)',
      data.priority,
      data.severity,
      data.type,
      data.reporterId,
      data.assigneeId,
      data.productId,
      now,
    );
  };

  const updateBug = async (key, value) => db.query('UPDATE bugs SET (?) = (?);', key, value);

  const getBug = async (id) => db.query('SELECT * FROM bugs WHERE id=(?)', [id]);

  const listBugs = async () => db.query('SELECT * FROM bugs');

  const deleteBug = async (id) => db.query('DELETE * FROM bugs WHERE id=(?)', [id]);

  return {
    createBug,
    updateBug,
    getBug,
    listBugs,
    deleteBug,
  };
})();

module.exports = BugModel;
