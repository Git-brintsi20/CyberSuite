const express = require('express');
const router = express.Router();
const {
  setup2FA,
  verify2FA,
  validate2FA,
  disable2FA,
  get2FAStatus,
  regenerateBackupCodes,
} = require('../controllers/twoFactorController');
const { protect } = require('../middleware/auth');

// @route   GET /api/2fa/status
// @desc    Get 2FA status
// @access  Private
router.get('/status', protect, get2FAStatus);

// @route   POST /api/2fa/setup
// @desc    Generate 2FA setup (secret + QR code)
// @access  Private
router.post('/setup', protect, setup2FA);

// @route   POST /api/2fa/verify
// @desc    Verify and enable 2FA
// @access  Private
router.post('/verify', protect, verify2FA);

// @route   POST /api/2fa/validate
// @desc    Validate 2FA token during login
// @access  Public
router.post('/validate', validate2FA);

// @route   POST /api/2fa/disable
// @desc    Disable 2FA
// @access  Private
router.post('/disable', protect, disable2FA);

// @route   POST /api/2fa/backup-codes/regenerate
// @desc    Regenerate backup codes
// @access  Private
router.post('/backup-codes/regenerate', protect, regenerateBackupCodes);

module.exports = router;
