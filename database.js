const mariadb = require('mariadb');
const HTTPError = require('./bin/errors/HTTPError');
const logger = require('./bin/helpers/logger');

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
}

module.exports = new Database();
