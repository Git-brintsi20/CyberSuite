const mongoose = require('mongoose');

const fileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  originalName: {
    type: String,
    required: true,
  },
  encryptedName: {
    type: String,
    required: true,
    unique: true,
  },
  fileSize: {
    type: Number,
    required: true,
  },
  mimeType: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    enum: ['document', 'image', 'video', 'audio', 'other'],
    default: 'other',
  },
  encryptionIV: {
    type: String,
    required: true,
  },
  encryptionAuthTag: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    default: '',
  },
  tags: [{
    type: String,
  }],
  isFavorite: {
    type: Boolean,
    default: false,
  },
  downloadCount: {
    type: Number,
    default: 0,
  },
  lastAccessed: {
    type: Date,
  },
}, {
  timestamps: true,
});

// Index for faster queries
fileSchema.index({ user: 1, createdAt: -1 });
fileSchema.index({ user: 1, category: 1 });

module.exports = mongoose.model('File', fileSchema);
