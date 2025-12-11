const crypto = require('crypto');

// Load encryption key from environment variables
const algorithm = 'aes-256-gcm';
const key = Buffer.from(process.env.ENCRYPTION_KEY, 'hex');

/**
 * Encrypts text using AES-256-GCM
 * @param {string} text - The text to encrypt
 * @returns {object} - Object containing iv, encryptedData, and authTag as hex strings
 */
function encrypt(text) {
  try {
    // Generate a random initialization vector
    const iv = crypto.randomBytes(16);
    
    // Create cipher with algorithm, key, and IV
    const cipher = crypto.createCipheriv(algorithm, key, iv);
    
    // Encrypt the text
    let encrypted = cipher.update(text, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    
    // Get the authentication tag
    const authTag = cipher.getAuthTag();
    
    return {
      iv: iv.toString('hex'),
      encryptedData: encrypted,
      authTag: authTag.toString('hex')
    };
  } catch (error) {
    console.error('Encryption error:', error);
    throw new Error('Failed to encrypt data');
  }
}

/**
 * Decrypts data using AES-256-GCM
 * @param {object} encryptedObject - Object containing iv, encryptedData, and authTag
 * @returns {string} - The decrypted text
 */
function decrypt(encryptedObject) {
  try {
    const { iv, encryptedData, authTag } = encryptedObject;
    
    // Convert hex strings back to buffers
    const ivBuffer = Buffer.from(iv, 'hex');
    const authTagBuffer = Buffer.from(authTag, 'hex');
    
    // Create decipher with algorithm, key, and IV
    const decipher = crypto.createDecipheriv(algorithm, key, ivBuffer);
    
    // Set the authentication tag
    decipher.setAuthTag(authTagBuffer);
    
    // Decrypt the data
    let decrypted = decipher.update(encryptedData, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    
    return decrypted;
  } catch (error) {
    console.error('Decryption error:', error);
    throw new Error('Failed to decrypt data');
  }
}

module.exports = {
  encrypt,
  decrypt
};
