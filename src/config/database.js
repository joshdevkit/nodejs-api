const mongoose = require('mongoose');
const config = require('./index');

const connectDB = async () => {
  try {
    await mongoose.connect(config.DB_URI);
    // console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('Database connection failed:', error);
    process.exit(1);
  }
};

module.exports = { connectDB };