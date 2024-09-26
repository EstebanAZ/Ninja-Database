const errorHandler = (err, req, res, next) => {
    // Set default status code and message
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';
  
    // Check if the environment is in development
    if (process.env.NODE_ENV === 'development') {
      // In development, include detailed error information
      return res.status(statusCode).json({
        status: 'error',
        statusCode,
        message,
        stack: err.stack, // Detailed stack trace for debugging
      });
    }
  
    // In production, hide stack trace and send a generic message
    return res.status(statusCode).json({
      status: 'error',
      statusCode,
      message,
    });
  };
  
  module.exports = errorHandler;
  