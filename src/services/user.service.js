const User = require('../models/user.model');
const { AppError } = require('../utils/response');

class UserService {
  async getAllUsers(page = 1, limit = 10, filters = {}) {
    const skip = (page - 1) * limit;
    
    const query = {};
    if (filters.role) query.role = filters.role;
    if (filters.isActive !== undefined) query.isActive = filters.isActive;
    if (filters.search) {
      query.$or = [
        { name: { $regex: filters.search, $options: 'i' } },
        { email: { $regex: filters.search, $options: 'i' } }
      ];
    }

    const users = await User.find(query)
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 });

    const total = await User.countDocuments(query);

    return {
      users,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    };
  }

  async getUserById(id) {
    const user = await User.findById(id);
    if (!user) {
      throw new AppError('User not found', 404);
    }
    return user;
  }

  async updateUser(id, updateData) {
    const user = await User.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true }
    );
    
    if (!user) {
      throw new AppError('User not found', 404);
    }
    
    return user;
  }

  async deleteUser(id) {
    const user = await User.findByIdAndDelete(id);
    if (!user) {
      throw new AppError('User not found', 404);
    }
    return user;
  }

  async getUserProfile(userId) {
    const user = await User.findById(userId);
    if (!user) {
      throw new AppError('User not found', 404);
    }
    return user;
  }

  async updateUserProfile(userId, updateData) {
    // Remove sensitive fields that shouldn't be updated through profile
    delete updateData.role;
    delete updateData.isActive;
    
    const user = await User.findByIdAndUpdate(
      userId,
      updateData,
      { new: true, runValidators: true }
    );
    
    if (!user) {
      throw new AppError('User not found', 404);
    }
    
    return user;
  }
}

module.exports = new UserService();