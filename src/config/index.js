require('dotenv').config();

module.exports = {
  PORT: process.env.PORT || 8000,
  NODE_ENV: process.env.NODE_ENV || 'development',
  DB_URI: process.env.DB_URI ,
  JWT_SECRET: process.env.JWT_SECRET ,
  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN || '7d',
};