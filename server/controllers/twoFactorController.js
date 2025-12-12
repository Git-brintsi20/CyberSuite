const speakeasy = require('speakeasy');
const QRCode = require('qrcode');
const crypto = require('crypto');
const TwoFactor = require('../models/TwoFactor');
const User = require('../models/User');

/**
 * @desc    Generate 2FA setup (secret + QR code)
 * @route   POST /api/2fa/setup
 * @access  Private
 */
const setup2FA = async (req, res) => {
  try {
    const userId = req.user._id;

    // Check if user already has 2FA
    let twoFactor = await TwoFactor.findOne({ user: userId });
    
    if (twoFactor && twoFactor.isEnabled) {
      return res.status(400).json({
        success: false,
        message: '2FA is already enabled. Disable it first to set up again.',
      });
    }

    // Generate secret
    const secret = speakeasy.generateSecret({
      name: `CyberSuite (${req.user.email})`,
      issuer: 'CyberSuite',
    });

    // Generate backup codes (8 codes)
    const backupCodes = [];
    for (let i = 0; i < 8; i++) {
      backupCodes.push({
        code: crypto.randomBytes(4).toString('hex').toUpperCase(),
        used: false,
      });
    }

    // Save or update 2FA record (not enabled yet)
    if (twoFactor) {
      twoFactor.secret = secret.base32;
      twoFactor.backupCodes = backupCodes;
      twoFactor.isEnabled = false;
      await twoFactor.save();
    } else {
      twoFactor = await TwoFactor.create({
        user: userId,
        secret: secret.base32,
        backupCodes,
        isEnabled: false,
      });
    }

    // Generate QR code
    const qrCodeUrl = await QRCode.toDataURL(secret.otpauth_url);

    res.json({
      success: true,
      data: {
        secret: secret.base32,
        qrCode: qrCodeUrl,
        backupCodes: backupCodes.map(bc => bc.code),
      },
    });
  } catch (error) {
    console.error('2FA Setup Error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to set up 2FA',
    });
  }
};

/**
 * @desc    Verify and enable 2FA
 * @route   POST /api/2fa/verify
 * @access  Private
 */
const verify2FA = async (req, res) => {
  try {
    const { token } = req.body;
    const userId = req.user._id;

    if (!token) {
      return res.status(400).json({
        success: false,
        message: 'Verification token is required',
      });
    }

    const twoFactor = await TwoFactor.findOne({ user: userId });

    if (!twoFactor) {
      return res.status(404).json({
        success: false,
        message: '2FA not set up. Please set up 2FA first.',
      });
    }

    // Verify token
    const verified = speakeasy.totp.verify({
      secret: twoFactor.secret,
      encoding: 'base32',
      token: token,
      window: 2, // Allow 2 time steps before/after
    });

    if (!verified) {
      return res.status(400).json({
        success: false,
        message: 'Invalid verification code',
      });
    }

    // Enable 2FA
    twoFactor.isEnabled = true;
    twoFactor.verifiedAt = new Date();
    twoFactor.lastUsed = new Date();
    await twoFactor.save();

    res.json({
      success: true,
      message: '2FA enabled successfully',
    });
  } catch (error) {
    console.error('2FA Verification Error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to verify 2FA',
    });
  }
};

/**
 * @desc    Validate 2FA token during login
 * @route   POST /api/2fa/validate
 * @access  Public (but requires pending auth)
 */
const validate2FA = async (req, res) => {
  try {
    const { userId, token, isBackupCode } = req.body;

    if (!userId || !token) {
      return res.status(400).json({
        success: false,
        message: 'User ID and token are required',
      });
    }

    const twoFactor = await TwoFactor.findOne({ user: userId });

    if (!twoFactor || !twoFactor.isEnabled) {
      return res.status(400).json({
        success: false,
        message: '2FA is not enabled for this account',
      });
    }

    let isValid = false;

    if (isBackupCode) {
      // Validate backup code
      const backupCode = twoFactor.backupCodes.find(
        bc => bc.code === token.toUpperCase() && !bc.used
      );

      if (backupCode) {
        backupCode.used = true;
        backupCode.usedAt = new Date();
        await twoFactor.save();
        isValid = true;
      }
    } else {
      // Validate TOTP token
      isValid = speakeasy.totp.verify({
        secret: twoFactor.secret,
        encoding: 'base32',
        token: token,
        window: 2,
      });

      if (isValid) {
        twoFactor.lastUsed = new Date();
        await twoFactor.save();
      }
    }

    if (!isValid) {
      return res.status(400).json({
        success: false,
        message: 'Invalid verification code',
      });
    }

    res.json({
      success: true,
      message: '2FA validated successfully',
    });
  } catch (error) {
    console.error('2FA Validation Error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to validate 2FA',
    });
  }
};

/**
 * @desc    Disable 2FA
 * @route   POST /api/2fa/disable
 * @access  Private
 */
const disable2FA = async (req, res) => {
  try {
    const { password } = req.body;
    const userId = req.user._id;

    if (!password) {
      return res.status(400).json({
        success: false,
        message: 'Password is required to disable 2FA',
      });
    }

    // Verify password
    const user = await User.findById(userId);
    const isPasswordValid = await user.comparePassword(password);

    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: 'Invalid password',
      });
    }

    // Delete 2FA record
    await TwoFactor.findOneAndDelete({ user: userId });

    res.json({
      success: true,
      message: '2FA disabled successfully',
    });
  } catch (error) {
    console.error('2FA Disable Error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to disable 2FA',
    });
  }
};

/**
 * @desc    Get 2FA status
 * @route   GET /api/2fa/status
 * @access  Private
 */
const get2FAStatus = async (req, res) => {
  try {
    const userId = req.user._id;
    const twoFactor = await TwoFactor.findOne({ user: userId });

    res.json({
      success: true,
      data: {
        isEnabled: twoFactor ? twoFactor.isEnabled : false,
        verifiedAt: twoFactor?.verifiedAt,
        lastUsed: twoFactor?.lastUsed,
        backupCodesRemaining: twoFactor
          ? twoFactor.backupCodes.filter(bc => !bc.used).length
          : 0,
      },
    });
  } catch (error) {
    console.error('2FA Status Error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to get 2FA status',
    });
  }
};

/**
 * @desc    Regenerate backup codes
 * @route   POST /api/2fa/backup-codes/regenerate
 * @access  Private
 */
const regenerateBackupCodes = async (req, res) => {
  try {
    const { password } = req.body;
    const userId = req.user._id;

    if (!password) {
      return res.status(400).json({
        success: false,
        message: 'Password is required',
      });
    }

    // Verify password
    const user = await User.findById(userId);
    const isPasswordValid = await user.comparePassword(password);

    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: 'Invalid password',
      });
    }

    const twoFactor = await TwoFactor.findOne({ user: userId });

    if (!twoFactor || !twoFactor.isEnabled) {
      return res.status(400).json({
        success: false,
        message: '2FA is not enabled',
      });
    }

    // Generate new backup codes
    const backupCodes = [];
    for (let i = 0; i < 8; i++) {
      backupCodes.push({
        code: crypto.randomBytes(4).toString('hex').toUpperCase(),
        used: false,
      });
    }

    twoFactor.backupCodes = backupCodes;
    await twoFactor.save();

    res.json({
      success: true,
      data: {
        backupCodes: backupCodes.map(bc => bc.code),
      },
    });
  } catch (error) {
    console.error('Backup Codes Regeneration Error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to regenerate backup codes',
    });
  }
};

module.exports = {
  setup2FA,
  verify2FA,
  validate2FA,
  disable2FA,
  get2FAStatus,
  regenerateBackupCodes,
};
