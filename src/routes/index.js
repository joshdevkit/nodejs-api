const express = require('express');
const authRoutes = require('./auth.routes');
const userRoutes = require('./user.routes');

const router = express.Router();

router.get('/', (req, res) => {
  res.json({ message: 'Welcome to the NODEJS API' });
});

// Health check route
router.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

router.use('/auth', authRoutes);
router.use('/users', userRoutes);

module.exports = router;