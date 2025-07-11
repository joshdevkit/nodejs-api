const userService = require('../services/user.service');
const { asyncHandler, successResponse } = require('../utils/response');

const getAllUsers = asyncHandler(async (req, res) => {
  const { page = 1, limit = 10, role, isActive, search } = req.query;
  
  const filters = {};
  if (role) filters.role = role;
  if (isActive !== undefined) filters.isActive = isActive === 'true';
  if (search) filters.search = search;

  const result = await userService.getAllUsers(
    parseInt(page),
    parseInt(limit),
    filters
  );

  successResponse(res, {
    message: 'Users retrieved successfully',
    data: result.users,
    pagination: result.pagination
  });
});

const getUserById = asyncHandler(async (req, res) => {
  const user = await userService.getUserById(req.params.id);
  
  successResponse(res, {
    message: 'User retrieved successfully',
    data: user
  });
});

const updateUser = asyncHandler(async (req, res) => {
  const user = await userService.updateUser(req.params.id, req.body);
  
  successResponse(res, {
    message: 'User updated successfully',
    data: user
  });
});

const deleteUser = asyncHandler(async (req, res) => {
  await userService.deleteUser(req.params.id);
  
  successResponse(res, {
    message: 'User deleted successfully'
  });
});

const getProfile = asyncHandler(async (req, res) => {
  const user = await userService.getUserProfile(req.user._id);
  
  successResponse(res, {
    message: 'Profile retrieved successfully',
    data: user
  });
});

const updateProfile = asyncHandler(async (req, res) => {
  const user = await userService.updateUserProfile(req.user._id, req.body);
  
  successResponse(res, {
    message: 'Profile updated successfully',
    data: user
  });
});

module.exports = {
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  getProfile,
  updateProfile
};