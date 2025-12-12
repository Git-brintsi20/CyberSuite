const mongoose = require('mongoose');

const twoFactorSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true,
  },
  secret: {
    type: String,
    required: true,
  },
  isEnabled: {
    type: Boolean,
    default: false,
  },
  backupCodes: [{
    code: {
      type: String,
      required: true,
    },
    used: {
      type: Boolean,
      default: false,
    },
    usedAt: {
      type: Date,
    },
  }],
  verifiedAt: {
    type: Date,
  },
  lastUsed: {
    type: Date,
  },
}, {
  timestamps: true,
});

// Index for faster lookups
twoFactorSchema.index({ user: 1 });

module.exports = mongoose.model('TwoFactor', twoFactorSchema);
