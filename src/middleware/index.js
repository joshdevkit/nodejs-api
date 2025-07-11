const { authenticate, authorize } = require('./auth.middleware');
const { errorHandler, notFound } = require('./error.middleware');
const { validateRegistration, validateLogin, validateUserUpdate } = require('./validation.middleware');

module.exports = {
  authenticate,
  authorize,
  errorHandler,
  notFound,
  validateRegistration,
  validateLogin,
  validateUserUpdate
};