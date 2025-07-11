class AppError extends Error {
  constructor(message, statusCode, errors = null) {
    super(message);
    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
    this.isOperational = true;
    this.errors = errors; // Add errors property

    Error.captureStackTrace(this, this.constructor);
  }
}

const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

const successResponse = (res, data, statusCode = 200) => {
  res.status(statusCode).json({
    success: true,
    ...data
  });
};

module.exports = {
  AppError,
  asyncHandler,
  successResponse
};