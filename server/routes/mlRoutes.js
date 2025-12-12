const express = require('express');
const router = express.Router();
const mlController = require('../controllers/mlController');
const { protect } = require('../middleware/auth');

/**
 * ML Service Routes
 * 
 * These routes proxy requests to the Python ML service
 * for anomaly detection and password analysis
 */

// Public routes (no auth required)
router.get('/health', mlController.checkMLHealth);
router.post('/analyze-password', mlController.analyzePassword);

// Protected routes (auth required)
router.post('/detect-anomaly', protect, mlController.detectAnomaly);
router.get('/stats', protect, mlController.getMLStats);

// Admin-only routes
router.post('/train', protect, mlController.trainModels);

module.exports = router;
