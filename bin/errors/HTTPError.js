// Here we extend the functionality of Error objects,
// allowing us to cleanly display status codes to our users

class HTTPError extends Error {
  constructor(statusCode, message) {
    super();
    this.statusCode = statusCode;
    this.message = message;
    this.isOperational = true;
  }
}

module.exports = HTTPError;
