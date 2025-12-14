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

// No need for explicit index - 'unique: true' on user field already creates it

module.exports = mongoose.model('TwoFactor', twoFactorSchema);
