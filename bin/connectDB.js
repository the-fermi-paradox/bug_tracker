#!/usr/bin/env node
const mariadb = require('mariadb');

mariadb.createConnection({
  socketPath: '/run/mysqld/mysqld.sock',
  user: 'root',
  database: 'bugs',
}).then((connection) => { module.exports = connection; })
  .catch((err) => { throw err; });
