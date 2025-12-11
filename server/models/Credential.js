const mongoose = require('mongoose');

const credentialSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true
  },
  siteName: {
    type: String,
    required: [true, 'Site name is required'],
    trim: true
  },
  siteUrl: {
    type: String,
    trim: true
  },
  username: {
    type: String,
    required: [true, 'Username is required'],
    trim: true
  },
  // Encrypted password stored as object with iv, content, and authTag
  encryptedPassword: {
    iv: {
      type: String,
      required: true
    },
    encryptedData: {
      type: String,
      required: true
    },
    authTag: {
      type: String,
      required: true
    }
  },
  category: {
    type: String,
    enum: ['social', 'email', 'banking', 'work', 'shopping', 'other'],
    default: 'other'
  },
  notes: {
    type: String,
    trim: true,
    maxlength: 500
  },
  isFavorite: {
    type: Boolean,
    default: false
  },
  lastAccessed: {
    type: Date
  }
}, {
  timestamps: true
});

// Index for faster queries
credentialSchema.index({ user: 1, siteName: 1 });

// Method to update last accessed time
credentialSchema.methods.updateLastAccessed = async function() {
  this.lastAccessed = Date.now();
  await this.save();
};

const Credential = mongoose.model('Credential', credentialSchema);

module.exports = Credential;
