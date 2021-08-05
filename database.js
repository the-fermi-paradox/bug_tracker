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
    // Let's build a string so we can log it to stdout
    let logString = query;
    for (let i = 0; i < params.length; i += 1) {
      const val = params[i];
      logString = logString.replace('?', val);
    }
    logger.info(logString);
    // We don't actually use this string though - we use the query with proper
    // parameters to prevent SQL injection
    const data = await this.pool.query(query, params);
    logger.info(data);
    return data;
  }
}

module.exports = new Database();
