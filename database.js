const mariadb = require('mariadb');
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

  async ask(query, params) {
    logger.info(query);
    const data = await this.pool.query(query, params);
    logger.info(data);
    return data;
  }
}

module.exports = new Database();
