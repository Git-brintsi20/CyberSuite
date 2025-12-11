const express = require('express');
const router = express.Router();
const { z } = require('zod');
const { protect } = require('../middleware/auth');
const { encrypt, decrypt } = require('../utils/encryption');
const Credential = require('../models/Credential');

// Validation schemas
const addCredentialSchema = z.object({
  siteName: z.string().min(1, 'Site name is required'),
  siteUrl: z.string().url('Invalid URL').optional().or(z.literal('')),
  username: z.string().min(1, 'Username is required'),
  password: z.string().min(1, 'Password is required'),
  category: z.enum(['social', 'email', 'banking', 'work', 'shopping', 'other']).optional(),
  notes: z.string().max(500).optional()
});

const updateCredentialSchema = z.object({
  siteName: z.string().min(1).optional(),
  siteUrl: z.string().url().optional().or(z.literal('')),
  username: z.string().min(1).optional(),
  password: z.string().min(1).optional(),
  category: z.enum(['social', 'email', 'banking', 'work', 'shopping', 'other']).optional(),
  notes: z.string().max(500).optional(),
  isFavorite: z.boolean().optional()
});

/**
 * @desc    Get all credentials for logged-in user
 * @route   GET /api/passwords
 * @access  Private
 */
router.get('/', protect, async (req, res) => {
  try {
    const credentials = await Credential.find({ user: req.user.id })
      .select('-encryptedPassword') // Don't send encrypted passwords in list
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: credentials.length,
      data: credentials
    });
  } catch (error) {
    console.error('Get credentials error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch credentials'
    });
  }
});

/**
 * @desc    Get single credential by ID
 * @route   GET /api/passwords/:id
 * @access  Private
 */
router.get('/:id', protect, async (req, res) => {
  try {
    const credential = await Credential.findOne({
      _id: req.params.id,
      user: req.user.id
    });

    if (!credential) {
      return res.status(404).json({
        success: false,
        message: 'Credential not found'
      });
    }

    res.status(200).json({
      success: true,
      data: credential
    });
  } catch (error) {
    console.error('Get credential error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch credential'
    });
  }
});

/**
 * @desc    Add new credential
 * @route   POST /api/passwords
 * @access  Private
 */
router.post('/', protect, async (req, res) => {
  try {
    // Validate input
    const validatedData = addCredentialSchema.parse(req.body);
    const { siteName, siteUrl, username, password, category, notes } = validatedData;

    // Encrypt the password
    const encryptedPassword = encrypt(password);

    // Create credential
    const credential = await Credential.create({
      user: req.user.id,
      siteName,
      siteUrl,
      username,
      encryptedPassword,
      category: category || 'other',
      notes
    });

    // Return without encrypted password details
    const credentialResponse = credential.toObject();
    delete credentialResponse.encryptedPassword;

    res.status(201).json({
      success: true,
      message: 'Credential added successfully',
      data: credentialResponse
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({
        success: false,
        message: 'Validation error',
        errors: error.errors.map(e => ({ field: e.path[0], message: e.message }))
      });
    }

    console.error('Add credential error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to add credential'
    });
  }
});

/**
 * @desc    Update credential
 * @route   PUT /api/passwords/:id
 * @access  Private
 */
router.put('/:id', protect, async (req, res) => {
  try {
    // Validate input
    const validatedData = updateCredentialSchema.parse(req.body);

    // Find credential
    const credential = await Credential.findOne({
      _id: req.params.id,
      user: req.user.id
    });

    if (!credential) {
      return res.status(404).json({
        success: false,
        message: 'Credential not found'
      });
    }

    // Update fields
    if (validatedData.siteName) credential.siteName = validatedData.siteName;
    if (validatedData.siteUrl !== undefined) credential.siteUrl = validatedData.siteUrl;
    if (validatedData.username) credential.username = validatedData.username;
    if (validatedData.category) credential.category = validatedData.category;
    if (validatedData.notes !== undefined) credential.notes = validatedData.notes;
    if (validatedData.isFavorite !== undefined) credential.isFavorite = validatedData.isFavorite;

    // If password is being updated, re-encrypt it
    if (validatedData.password) {
      credential.encryptedPassword = encrypt(validatedData.password);
    }

    await credential.save();

    // Return without encrypted password details
    const credentialResponse = credential.toObject();
    delete credentialResponse.encryptedPassword;

    res.status(200).json({
      success: true,
      message: 'Credential updated successfully',
      data: credentialResponse
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({
        success: false,
        message: 'Validation error',
        errors: error.errors.map(e => ({ field: e.path[0], message: e.message }))
      });
    }

    console.error('Update credential error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update credential'
    });
  }
});

/**
 * @desc    Decrypt and get password for a credential
 * @route   POST /api/passwords/:id/decrypt
 * @access  Private
 */
router.post('/:id/decrypt', protect, async (req, res) => {
  try {
    // Find credential
    const credential = await Credential.findOne({
      _id: req.params.id,
      user: req.user.id
    });

    if (!credential) {
      return res.status(404).json({
        success: false,
        message: 'Credential not found'
      });
    }

    // Decrypt the password
    const decryptedPassword = decrypt(credential.encryptedPassword);

    // Update last accessed time
    await credential.updateLastAccessed();

    res.status(200).json({
      success: true,
      password: decryptedPassword
    });
  } catch (error) {
    console.error('Decrypt password error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to decrypt password'
    });
  }
});

/**
 * @desc    Delete credential
 * @route   DELETE /api/passwords/:id
 * @access  Private
 */
router.delete('/:id', protect, async (req, res) => {
  try {
    const credential = await Credential.findOne({
      _id: req.params.id,
      user: req.user.id
    });

    if (!credential) {
      return res.status(404).json({
        success: false,
        message: 'Credential not found'
      });
    }

    await credential.deleteOne();

    res.status(200).json({
      success: true,
      message: 'Credential deleted successfully'
    });
  } catch (error) {
    console.error('Delete credential error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete credential'
    });
  }
});

/**
 * @desc    Get password strength statistics
 * @route   GET /api/passwords/stats/strength
 * @access  Private
 */
router.get('/stats/strength', protect, async (req, res) => {
  try {
    const credentials = await Credential.find({ user: req.user.id });

    const stats = {
      total: credentials.length,
      categories: {},
      favorites: credentials.filter(c => c.isFavorite).length
    };

    // Count by category
    credentials.forEach(cred => {
      stats.categories[cred.category] = (stats.categories[cred.category] || 0) + 1;
    });

    res.status(200).json({
      success: true,
      data: stats
    });
  } catch (error) {
    console.error('Get stats error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch statistics'
    });
  }
});

module.exports = router;
