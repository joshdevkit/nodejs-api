const express = require('express');
const {
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  getProfile,
  updateProfile
} = require('../controllers/user.controller');
const { authenticate, authorize, validateUserUpdate } = require('../middleware');

const router = express.Router();

// Protected routes - require authentication
router.use(authenticate);

// Profile routes
router.get('/profile', getProfile);
router.put('/profile', validateUserUpdate, updateProfile);

// Admin only routes
router.get('/', authorize('admin'), getAllUsers);
router.get('/:id', authorize('admin'), getUserById);
router.put('/:id', authorize('admin'), validateUserUpdate, updateUser);
router.delete('/:id', authorize('admin'), deleteUser);

module.exports = router;