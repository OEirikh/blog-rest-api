const {ValidationError, WrongParametrsError} = require('./errors');

const ctrlWrapper = (ctrl) => {
  return async (req, res, next) => {
    try {
      await ctrl(req, res, next);
    } catch (error) {
      next(error);
    }
  };
};

const errorHandler = (error, req, res, next) => {
  if (
    error instanceof ValidationError ||
    error instanceof WrongParametrsError
  ) {
    return res.status(error.status).json({message: error.message});
  }
  res.status(500).json({message: error.message});
};

// const ctrlWrapper = (ctrl) => {
//   return (req, res, next) => {
//     ctrl(req, res).cath(next);
//   };
// };

module.exports = {
  ctrlWrapper,
  errorHandler,
};
