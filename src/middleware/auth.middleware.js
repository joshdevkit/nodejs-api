const jwt = require('jsonwebtoken');
const User = require('../models/user.model');
const config = require('../config');
const { AppError, asyncHandler } = require('../utils/response');

const authenticate = asyncHandler(async (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  
  if (!token) {
    throw new AppError('Access denied. No token provided', 401);
  }

  const decoded = jwt.verify(token, config.JWT_SECRET);
  const user = await User.findById(decoded.userId);
  
  if (!user) {
    throw new AppError('Invalid token', 401);
  }

  req.user = user;
  next();
});

const authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      throw new AppError('Access denied. Insufficient permissions', 403);
    }
    next();
  };
};

module.exports = {
  authenticate,
  authorize
};