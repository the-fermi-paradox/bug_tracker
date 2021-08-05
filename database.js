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
    let logString = '';
    for (let i = 0; i < params.length; i += 1) {
      const val = params[i];
      logString = query.replace('?', val);
    }
    logger.info(logString);
    const data = await this.pool.query(query, params);
    logger.info(data);
    return data;
  }
}

module.exports = new Database();
