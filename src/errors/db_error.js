// Here we extend the functionality of Error objects,
// allowing us to cleanly display status codes to our users

class DBError extends Error {
  constructor(error) {
    super();
    this.sqlState = error.sqlState;
    this.message = error.message;
    this.isOperational = !error.fatal;
  }
}

module.exports = DBError;
