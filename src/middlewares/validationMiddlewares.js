const Joi = require('joi'); // валідація
const {ValidationError} = require('../helpers/errors');

module.exports = {
  addPosstValidation: (req, res, next) => {
    const schema = Joi.object({
      topic: Joi.string().alphanum().min(5).max(20).required(),
      text: Joi.string().alphanum().min(10).max(400).required(),
    });
    const validationResults = schema.validate(req.body);
    if (validationResults) {
      next;
      new ValidationError(validationResults.error.details);
    }
    next();
  },

  changePostValidation: (req, res, next) => {
    const schema = Joi.object({
      topic: Joi.string().alphanum().min(5).max(20).optional(),
      text: Joi.string().alphanum().min(10).max(400).optional(),
    });
    const validationResults = schema.validate(req.body);
    if (validationResults) {
      next;
      new ValidationError(validationResults.error.details);
    }
    next();
  },
};
