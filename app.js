const express = require('express');
const path = require('path');
const handleError = require('./src/errors/handle_error');
const logger = require('./src/helpers/logger');
const tickets = require('./src/tickets/routes');
const users = require('./src/users/routes');

const app = express();

// Log all incoming requests
app.use((req, res, next) => {
  logger.http(req);
  next();
});

// Parse any JSON in the request
app.use(express.json());

// Hook in our routes
app.use('/tickets', tickets);
app.use('/users', users);

app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

// Let's handle our errors

process.on('uncaughtException', (err) => {
  handleError(err);
});

process.on('unhandledRejection', (err) => {
  handleError(err);
});

app.use((err, req, res, next) => {
  handleError(err, res);
});

module.exports = app;
