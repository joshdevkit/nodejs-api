const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const compression = require('compression');

const routes = require('./routes');
const { errorHandler, notFound } = require('./middleware');
const { connectDB } = require('./config/database');

const app = express();

// Connect to database
connectDB();

// Security middleware
app.use(helmet());
app.use(cors());
app.use(compression());

// Logging
app.use(morgan('combined'));

// Body parsing
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/v1', routes);

// Error handling
app.use(notFound);
app.use(errorHandler);

module.exports = app;