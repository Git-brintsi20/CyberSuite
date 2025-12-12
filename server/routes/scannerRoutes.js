const express = require('express');
const router = express.Router();
const { scanNetwork, quickScan } = require('../controllers/scannerController');
const { protect } = require('../middleware/auth');

// All routes require authentication
router.use(protect);

// POST /api/scanner/scan - Full port scan
router.post('/scan', scanNetwork);

// POST /api/scanner/quick - Quick host discovery
router.post('/quick', quickScan);

module.exports = router;
