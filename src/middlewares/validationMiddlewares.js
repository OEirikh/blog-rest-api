const Joi = require('joi'); // валідація

/**
 * Adds two numbers together.
 * @param {int} req The first number.
 * @param {int} res The second number.
 * @param {int} schema The third number.
 * @returns {int} Answer for error.
 */

function errorValidations(req, res, schema) {
  const {error} = schema.validate(req.body);
  if (error) {
    return res.status(400).json({status: error.details});
  }
}

module.exports = {
  addPosstValidation: (req, res, next) => {
    const schema = Joi.object({
      topic: Joi.string().alphanum().min(5).max(20).required(),
      text: Joi.string().alphanum().min(10).max(400).required(),
    });
    errorValidations(req, res, schema);
    next();
  },

  changePostValidation: (req, res, next) => {
    const schema = Joi.object({
      topic: Joi.string().alphanum().min(5).max(20).optional(),
      text: Joi.string().alphanum().min(10).max(400).optional(),
    });
    errorValidations(req, res, schema);
    next();
  },
};
