class NodeJS40Error extends Error {
  constructor(message) {
    super(message);
    this.status = 400;
  }
}

class ValidationError extends NodeJS40Error {
  constructor(message) {
    super(message);
    this.status = 400;
  }
}

class WrongParametrsError extends NodeJS40Error {
  constructor(message) {
    super(message);
    this.status = 400;
  }
}

class NotAuthorizedError extends NodeJS40Error {
  constructor(message) {
    super(message);
    this.status = 401;
  }
}

module.exports = {
  NodeJS40Error,
  ValidationError,
  WrongParametrsError,
  NotAuthorizedError,
};
