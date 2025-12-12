const crypto = require('crypto');
const fs = require('fs').promises;
const path = require('path');

// Encryption algorithm
const ALGORITHM = 'aes-256-gcm';
const KEY = Buffer.from(process.env.ENCRYPTION_KEY, 'hex');

/**
 * Encrypt a file using AES-256-GCM
 * @param {Buffer} fileBuffer - File content as buffer
 * @returns {Object} - Encrypted data with IV and auth tag
 */
const encryptFile = (fileBuffer) => {
  try {
    // Generate random IV (Initialization Vector)
    const iv = crypto.randomBytes(16);
    
    // Create cipher
    const cipher = crypto.createCipheriv(ALGORITHM, KEY, iv);
    
    // Encrypt the file
    const encrypted = Buffer.concat([
      cipher.update(fileBuffer),
      cipher.final()
    ]);
    
    // Get authentication tag
    const authTag = cipher.getAuthTag();
    
    return {
      encryptedData: encrypted,
      iv: iv.toString('hex'),
      authTag: authTag.toString('hex'),
    };
  } catch (error) {
    console.error('File encryption error:', error);
    throw new Error('Failed to encrypt file');
  }
};

/**
 * Decrypt a file using AES-256-GCM
 * @param {Buffer} encryptedBuffer - Encrypted file content
 * @param {string} ivHex - IV in hexadecimal
 * @param {string} authTagHex - Auth tag in hexadecimal
 * @returns {Buffer} - Decrypted file content
 */
const decryptFile = (encryptedBuffer, ivHex, authTagHex) => {
  try {
    // Convert hex strings back to buffers
    const iv = Buffer.from(ivHex, 'hex');
    const authTag = Buffer.from(authTagHex, 'hex');
    
    // Create decipher
    const decipher = crypto.createDecipheriv(ALGORITHM, KEY, iv);
    decipher.setAuthTag(authTag);
    
    // Decrypt the file
    const decrypted = Buffer.concat([
      decipher.update(encryptedBuffer),
      decipher.final()
    ]);
    
    return decrypted;
  } catch (error) {
    console.error('File decryption error:', error);
    throw new Error('Failed to decrypt file');
  }
};

/**
 * Generate a unique encrypted filename
 * @param {string} originalName - Original filename
 * @returns {string} - Encrypted filename
 */
const generateEncryptedFilename = (originalName) => {
  const timestamp = Date.now();
  const randomString = crypto.randomBytes(8).toString('hex');
  const extension = path.extname(originalName);
  return `${timestamp}_${randomString}${extension}.enc`;
};

/**
 * Get file category from mime type
 * @param {string} mimeType - File MIME type
 * @returns {string} - Category
 */
const getCategoryFromMimeType = (mimeType) => {
  if (mimeType.startsWith('image/')) return 'image';
  if (mimeType.startsWith('video/')) return 'video';
  if (mimeType.startsWith('audio/')) return 'audio';
  if (mimeType.includes('pdf') || mimeType.includes('document') || 
      mimeType.includes('text') || mimeType.includes('word') ||
      mimeType.includes('excel') || mimeType.includes('powerpoint')) {
    return 'document';
  }
  return 'other';
};

/**
 * Format file size to human readable format
 * @param {number} bytes - File size in bytes
 * @returns {string} - Formatted size
 */
const formatFileSize = (bytes) => {
  if (bytes === 0) return '0 Bytes';
  
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i];
};

/**
 * Validate file size (max 50MB)
 * @param {number} size - File size in bytes
 * @returns {boolean}
 */
const validateFileSize = (size) => {
  const MAX_SIZE = 50 * 1024 * 1024; // 50MB
  return size <= MAX_SIZE;
};

/**
 * Get uploads directory path
 * @returns {string}
 */
const getUploadsDir = () => {
  return path.join(__dirname, '../uploads');
};

/**
 * Ensure uploads directory exists
 */
const ensureUploadsDir = async () => {
  const uploadsDir = getUploadsDir();
  try {
    await fs.access(uploadsDir);
  } catch {
    await fs.mkdir(uploadsDir, { recursive: true });
  }
};

module.exports = {
  encryptFile,
  decryptFile,
  generateEncryptedFilename,
  getCategoryFromMimeType,
  formatFileSize,
  validateFileSize,
  getUploadsDir,
  ensureUploadsDir,
};
