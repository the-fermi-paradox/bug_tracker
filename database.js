const mariadb = require('mariadb');
const HTTPError = require('./src/errors/http_error');
const logger = require('./src/helpers/logger');

class Database {
  constructor() {
    this.pool = mariadb.createPool({
      socketPath: '/run/mysqld/mysqld.sock',
      user: 'root',
      database: 'bugtracker',
      connectionLimit: 5,
    });
  }

  async connect() {
    const connection = await this.pool.getConnection().catch((err) => {
      throw new HTTPError(500, err);
    });
    logger.info(`MariaDB connection established. ID: ${connection.threadId}`);
    return connection;
  }

  close(connection) {
    connection.release();
    logger.info(`MariaDB connection closed. ID: ${connection.threadId}`);
    logger.info(this.pool);
  }

  async ask(query, params) {
    logger.info(query);
    const [reject, resolve] = await this.pool.query(query, params);
  }
}

module.exports = new Database();
