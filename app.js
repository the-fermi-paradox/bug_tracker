const express = require('express');
const path = require('path');
const handleError = require('./bin/errors/handleError');

const app = express();

// Here we handle our middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

// We send any errors to our handler
app.use((err, req, res, next) => {
  err.isOperational ? handleError(err, res) : next(err);
});

module.exports = app;
