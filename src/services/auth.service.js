const jwt = require('jsonwebtoken');
const User = require('../models/user.model');
const config = require('../config');
const { AppError } = require('../utils/response');

class AuthService {
  async register(userData) {
    const existingUser = await User.findOne({ email: userData.email });
    if (existingUser) {
      throw new AppError('Email already exists', 400);
    }

    const user = await User.create(userData);
    const token = this.generateToken(user._id);
    
    return { user: this.sanitizeUser(user), token };
  }

  async login(email, password) {
    const user = await User.findOne({ email }).select('+password');
    if (!user || !(await user.comparePassword(password))) {
      throw new AppError('Invalid email or password', 401);
    }

    const token = this.generateToken(user._id);
    return { user: this.sanitizeUser(user), token };
  }

  generateToken(userId) {
    return jwt.sign({ userId }, config.JWT_SECRET, {
      expiresIn: config.JWT_EXPIRES_IN
    });
  }

  sanitizeUser(user) {
    const userObj = user.toObject();
    delete userObj.password;
    return userObj;
  }
}

module.exports = new AuthService();