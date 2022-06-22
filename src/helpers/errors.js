class ValidationError extends Error {
  constructor(message) {
    super(message);
    this.status = 400;
  }
}

class WrongParametrsError extends Error {
  constructor(message) {
    super(message);
    this.status = 400;
  }
}

class NotAuthorizedError extends Error {
  constructor(message) {
    super(message);
    this.status = 401;
  }
}

module.exports = {
  ValidationError,
  WrongParametrsError,
  NotAuthorizedError,
};
