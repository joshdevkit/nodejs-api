const Joi = require('joi');
const { AppError } = require('../utils/response');

const validate = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body, { abortEarly: false });
    if (error) {
      const errors = {};
      error.details.forEach(detail => {
        const field = detail.path.join('.');
        errors[field] = detail.message;
      });
      
      throw new AppError("Validation failed", 400, errors);
    }
    next();
  };
};

const validateRegistration = validate(
  Joi.object({
    name: Joi.string().trim().min(2).max(50).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    role: Joi.string().valid('user', 'admin').optional()
  })
);

const validateLogin = validate(
  Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required()
  })
);

const validateUserUpdate = validate(
  Joi.object({
    name: Joi.string().trim().min(2).max(50).optional(),
    email: Joi.string().email().optional(),
    role: Joi.string().valid('user', 'admin').optional(),
    isActive: Joi.boolean().optional()
  })
);

module.exports = {
  validate,
  validateRegistration,
  validateLogin,
  validateUserUpdate
};