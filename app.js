const express = require('express');
const path = require('path');
const handleError = require('./src/errors/handle_error');
const logger = require('./src/helpers/logger');
const tickets = require('./src/tickets/routes');

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

// Log all incoming requests
app.use((req, res, next) => {
  logger.http(req);
  next();
});

app.use('/tickets', tickets);

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
