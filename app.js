const express = require('express');
const path = require('path');
const fs = require('fs/promises');
const handleError = require('./src/errors/handle_error');
const logger = require('./src/helpers/logger');
const db = require('./database');

const app = express();

// Subscribe to events to listen to errors
// in particular, we want to handle any unhandled promise rejections
process.on('unhandledRejection', (error) => {
  throw error;
});

process.on('uncaughtException', (error) => {
  handleError(error);
  process.exit(1);
});

// Here we handle our middleware
app.use((req, res, next) => {
  logger.http(req);
  next();
});

// We initialize all of our tables.
app.use(async (req, res, next) => {
  try {
    // First read from the file holding our SQL queries
    /* eslint-disable-next-line security/detect-non-literal-fs-filename */
    const query = await fs.readFile(
      path.join(__dirname, 'schema.mysql'),
      'utf-8',
    );
    // Establish a connection
    const connection = db.connect();
    // Execute our query
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

// We send any errors to our handler if it's operational;
// otherwise we let the default error handler take care of them
app.use((err, req, res, next) => {
  logger.error(err);
  err.isOperational ? handleError(err, res) : next(err);
});

module.exports = app;
