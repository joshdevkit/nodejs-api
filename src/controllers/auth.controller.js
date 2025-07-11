const authService = require('../services/auth.service');
const { asyncHandler, successResponse } = require('../utils/response');

const register = asyncHandler(async (req, res) => {
  const { user, token } = await authService.register(req.body);
  
  successResponse(res, {
    message: 'User registered successfully',
    data: { user, token }
  }, 201);
});

const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const { user, token } = await authService.login(email, password);
  
  successResponse(res, {
    message: 'Login successful',
    data: { user, token }
  });
});

module.exports = {
  register,
  login
};