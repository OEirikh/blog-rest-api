const Joi = require('joi'); // валідація
const {ValidationError} = require('../helpers/errors');

module.exports = {
  addPosstValidation: (req, res, next) => {
    const schema = Joi.object({
      topic: Joi.string().min(5).max(20).required(),
      text: Joi.string().min(10).max(400).required(),
    });
    const validationResults = schema.validate(req.body);
    if (validationResults.error) {
      new ValidationError(JSON.stringify(validationResults.error.details));
    }
    next();
  },

  changePostValidation: (req, res, next) => {
    const schema = Joi.object({
      topic: Joi.string().min(5).max(20).optional(),
      text: Joi.string().min(10).max(400).optional(),
    });
    const validationResults = schema.validate(req.body);
    if (validationResults.error) {
      new ValidationError(JSON.stringify(validationResults.error.details));
    }
    next();
  },
};
