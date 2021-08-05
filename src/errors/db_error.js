// Here we extend the functionality of Error objects,
// allowing us to cleanly display status codes to our users

class DBError extends Error {
  constructor(error) {
    super();
    this.sqlState = error.sqlState;
    this.message = error.message;
    // The error is operational if error.fatal exists
    // AND it has a value of false
    this.isOperational = error.fatal != null ? !error.fatal : false;
  }
}

module.exports = DBError;
