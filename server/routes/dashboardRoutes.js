const express = require('express');
const router = express.Router();
const { getDashboardStats, getActivityData } = require('../controllers/dashboardController');
const { protect } = require('../middleware/auth');

// All routes require authentication
router.use(protect);

/**
 * @route   GET /api/dashboard/stats
 * @desc    Get dashboard statistics
 * @access  Private
 */
router.get('/stats', getDashboardStats);

/**
 * @route   GET /api/dashboard/activity
 * @desc    Get activity chart data
 * @access  Private
 */
router.get('/activity', getActivityData);

module.exports = router;
