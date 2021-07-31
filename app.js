const express = require('express');
const path = require('path');
const fs = require('fs/promises');
const handleError = require('./bin/errors/handleError');
const logger = require('./bin/helpers/logger');
const db = require('./database');

const app = express();

// Here we handle our middleware
app.use((req, res, next) => {
  logger.http(req);
  next();
});

// We initialize all of our tables.
app.use(async (req, res, next) => {
  try {
    /* eslint-disable-next-line security/detect-non-literal-fs-filename */
    const query = await fs.readFile(
      path.join(__dirname, 'schema.mysql'),
      'utf-8',
    );
    const connection = db.connect();
    await connection.query(query);
    db.close(connection);
    next();
  } catch (err) {
    next(err);
  }
});

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

// We send any errors to our handler
app.use((err, req, res, next) => {
  err.isOperational ? handleError(err, res) : next(err);
});

module.exports = app;
