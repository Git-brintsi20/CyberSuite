const axios = require('axios');

// ML Service base URL
const ML_SERVICE_URL = process.env.ML_SERVICE_URL || 'http://localhost:5001';

/**
 * Check if ML service is running
 */
const checkMLHealth = async (req, res) => {
  try {
    const response = await axios.get(`${ML_SERVICE_URL}/health`, {
      timeout: 5000
    });
    res.json(response.data);
  } catch (error) {
    console.error('ML service health check failed:', error.message);
    res.status(503).json({
      status: 'error',
      message: 'ML service unavailable',
      details: error.message
    });
  }
};

/**
 * Detect login anomalies
 */
const detectAnomaly = async (req, res) => {
  try {
    const loginData = req.body;
    
    // Validate required fields
    if (!loginData.timestamp || !loginData.ipAddress || !loginData.userAgent) {
      return res.status(400).json({
        status: 'error',
        message: 'Missing required fields: timestamp, ipAddress, userAgent'
      });
    }
    
    // Call ML service
    const response = await axios.post(
      `${ML_SERVICE_URL}/detect-anomaly`,
      loginData,
      { timeout: 10000 }
    );
    
    res.json(response.data);
  } catch (error) {
    console.error('Anomaly detection failed:', error.message);
    
    if (error.response) {
      // ML service returned an error
      return res.status(error.response.status).json(error.response.data);
    }
    
    // ML service unreachable
    res.status(503).json({
      status: 'error',
      message: 'ML service unavailable',
      details: error.message,
      // Return safe default when ML is unavailable
      isAnomaly: false,
      score: 0,
      message: 'ML detection unavailable - login allowed'
    });
  }
};

/**
 * Analyze password strength using ML
 */
const analyzePassword = async (req, res) => {
  try {
    const { password } = req.body;
    
    if (!password) {
      return res.status(400).json({
        status: 'error',
        message: 'Password is required'
      });
    }
    
    // Call ML service
    const response = await axios.post(
      `${ML_SERVICE_URL}/analyze-password`,
      { password },
      { timeout: 5000 }
    );
    
    res.json(response.data);
  } catch (error) {
    console.error('Password analysis failed:', error.message);
    
    if (error.response) {
      return res.status(error.response.status).json(error.response.data);
    }
    
    // Return basic analysis if ML service is down
    res.status(503).json({
      status: 'error',
      message: 'ML service unavailable - using basic validation',
      basicAnalysis: {
        length: req.body.password.length,
        strength: req.body.password.length >= 12 ? 'medium' : 'weak',
        message: 'ML-enhanced analysis unavailable'
      }
    });
  }
};

/**
 * Train or retrain ML models
 */
const trainModels = async (req, res) => {
  try {
    // Only admins can trigger training
    if (req.user.role !== 'admin') {
      return res.status(403).json({
        status: 'error',
        message: 'Only administrators can train ML models'
      });
    }
    
    const response = await axios.post(
      `${ML_SERVICE_URL}/train`,
      {},
      { timeout: 60000 } // 60 second timeout for training
    );
    
    res.json(response.data);
  } catch (error) {
    console.error('ML training failed:', error.message);
    
    if (error.response) {
      return res.status(error.response.status).json(error.response.data);
    }
    
    res.status(503).json({
      status: 'error',
      message: 'ML service unavailable',
      details: error.message
    });
  }
};

/**
 * Get ML service statistics
 */
const getMLStats = async (req, res) => {
  try {
    const response = await axios.get(`${ML_SERVICE_URL}/stats`, {
      timeout: 5000
    });
    
    res.json(response.data);
  } catch (error) {
    console.error('Failed to get ML stats:', error.message);
    
    if (error.response) {
      return res.status(error.response.status).json(error.response.data);
    }
    
    res.status(503).json({
      status: 'error',
      message: 'ML service unavailable',
      details: error.message
    });
  }
};

module.exports = {
  checkMLHealth,
  detectAnomaly,
  analyzePassword,
  trainModels,
  getMLStats
};
