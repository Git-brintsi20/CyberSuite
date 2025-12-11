const jwt = require('jsonwebtoken');
const User = require('../models/User');

/**
 * Middleware to protect routes - Verifies JWT token from cookies
 * Attaches user object to req.user if valid
 */
const protect = async (req, res, next) => {
  try {
    // Get token from cookie
    const token = req.cookies.jwt;

    // Check if token exists
    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'Not authorized - No token provided'
      });
    }

    try {
      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Get user from token (exclude password)
      const user = await User.findById(decoded.id).select('-password');

      if (!user) {
        return res.status(401).json({
          success: false,
          message: 'Not authorized - User not found'
        });
      }

      // Attach user to request object
      req.user = user;

      next();
    } catch (jwtError) {
      // Handle specific JWT errors
      if (jwtError.name === 'TokenExpiredError') {
        return res.status(401).json({
          success: false,
          message: 'Not authorized - Token expired'
        });
      }

      if (jwtError.name === 'JsonWebTokenError') {
        return res.status(401).json({
          success: false,
          message: 'Not authorized - Invalid token'
        });
      }

      throw jwtError;
    }
  } catch (error) {
    console.error('Auth middleware error:', error);
    res.status(401).json({
      success: false,
      message: 'Not authorized - Authentication failed'
    });
  }
};

/**
 * Optional auth middleware - Doesn't block if no token
 * Used for routes that work with or without authentication
 */
const optionalAuth = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;

    if (token) {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = await User.findById(decoded.id).select('-password');
      
      if (user) {
        req.user = user;
      }
    }

    next();
  } catch (error) {
    // Continue without authentication
    next();
  }
};

module.exports = {
  protect,
  optionalAuth
};
