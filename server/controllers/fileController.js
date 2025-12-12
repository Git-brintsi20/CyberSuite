const File = require('../models/File');
const multer = require('multer');
const fs = require('fs').promises;
const path = require('path');
const {
  encryptFile,
  decryptFile,
  generateEncryptedFilename,
  getCategoryFromMimeType,
  formatFileSize,
  validateFileSize,
  getUploadsDir,
  ensureUploadsDir,
} = require('../utils/fileEncryption');

// Configure multer for memory storage (we'll encrypt before saving to disk)
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 50 * 1024 * 1024, // 50MB max
  },
  fileFilter: (req, file, cb) => {
    // Allow all file types for now
    // You can add restrictions here if needed
    cb(null, true);
  },
}).single('file');

/**
 * @desc    Upload and encrypt a file
 * @route   POST /api/files/upload
 * @access  Private
 */
const uploadFile = async (req, res) => {
  upload(req, res, async (err) => {
    if (err instanceof multer.MulterError) {
      if (err.code === 'LIMIT_FILE_SIZE') {
        return res.status(400).json({
          success: false,
          message: 'File too large. Maximum size is 50MB',
        });
      }
      return res.status(400).json({
        success: false,
        message: 'File upload error: ' + err.message,
      });
    } else if (err) {
      return res.status(500).json({
        success: false,
        message: 'Server error during file upload',
      });
    }

    try {
      // Check if file was uploaded
      if (!req.file) {
        return res.status(400).json({
          success: false,
          message: 'No file uploaded',
        });
      }

      // Validate file size
      if (!validateFileSize(req.file.size)) {
        return res.status(400).json({
          success: false,
          message: 'File too large. Maximum size is 50MB',
        });
      }

      // Ensure uploads directory exists
      await ensureUploadsDir();

      // Encrypt the file
      const { encryptedData, iv, authTag } = encryptFile(req.file.buffer);

      // Generate encrypted filename
      const encryptedName = generateEncryptedFilename(req.file.originalname);
      const filePath = path.join(getUploadsDir(), encryptedName);

      // Save encrypted file to disk
      await fs.writeFile(filePath, encryptedData);

      // Determine category from MIME type
      const category = getCategoryFromMimeType(req.file.mimetype);

      // Extract metadata from request body
      const { description, tags } = req.body;

      // Create file record in database
      const fileRecord = await File.create({
        user: req.user._id,
        originalName: req.file.originalname,
        encryptedName,
        fileSize: req.file.size,
        mimeType: req.file.mimetype,
        category,
        encryptionIV: iv,
        encryptionAuthTag: authTag,
        description: description || '',
        tags: tags ? JSON.parse(tags) : [],
      });

      res.status(201).json({
        success: true,
        message: 'File uploaded and encrypted successfully',
        data: {
          _id: fileRecord._id,
          originalName: fileRecord.originalName,
          fileSize: fileRecord.fileSize,
          formattedSize: formatFileSize(fileRecord.fileSize),
          mimeType: fileRecord.mimeType,
          category: fileRecord.category,
          description: fileRecord.description,
          tags: fileRecord.tags,
          createdAt: fileRecord.createdAt,
        },
      });
    } catch (error) {
      console.error('Upload file error:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to upload file',
        error: error.message,
      });
    }
  });
};

/**
 * @desc    Get all files for user
 * @route   GET /api/files
 * @access  Private
 */
const getAllFiles = async (req, res) => {
  try {
    const { category, search, sortBy = '-createdAt' } = req.query;

    // Build query
    const query = { user: req.user._id };

    if (category && category !== 'all') {
      query.category = category;
    }

    if (search) {
      query.$or = [
        { originalName: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { tags: { $in: [new RegExp(search, 'i')] } },
      ];
    }

    // Fetch files
    const files = await File.find(query)
      .sort(sortBy)
      .select('-encryptionIV -encryptionAuthTag -encryptedName');

    // Format response
    const formattedFiles = files.map((file) => ({
      _id: file._id,
      originalName: file.originalName,
      fileSize: file.fileSize,
      formattedSize: formatFileSize(file.fileSize),
      mimeType: file.mimeType,
      category: file.category,
      description: file.description,
      tags: file.tags,
      isFavorite: file.isFavorite,
      downloadCount: file.downloadCount,
      lastAccessed: file.lastAccessed,
      createdAt: file.createdAt,
      updatedAt: file.updatedAt,
    }));

    // Calculate storage stats
    const totalSize = files.reduce((sum, file) => sum + file.fileSize, 0);
    const categoryCounts = files.reduce((acc, file) => {
      acc[file.category] = (acc[file.category] || 0) + 1;
      return acc;
    }, {});

    res.status(200).json({
      success: true,
      data: formattedFiles,
      stats: {
        totalFiles: files.length,
        totalSize,
        formattedTotalSize: formatFileSize(totalSize),
        categoryCounts,
      },
    });
  } catch (error) {
    console.error('Get files error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve files',
      error: error.message,
    });
  }
};

/**
 * @desc    Get single file metadata
 * @route   GET /api/files/:id
 * @access  Private
 */
const getFileById = async (req, res) => {
  try {
    const file = await File.findOne({
      _id: req.params.id,
      user: req.user._id,
    }).select('-encryptionIV -encryptionAuthTag -encryptedName');

    if (!file) {
      return res.status(404).json({
        success: false,
        message: 'File not found',
      });
    }

    res.status(200).json({
      success: true,
      data: {
        ...file.toObject(),
        formattedSize: formatFileSize(file.fileSize),
      },
    });
  } catch (error) {
    console.error('Get file error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to retrieve file',
      error: error.message,
    });
  }
};

/**
 * @desc    Download and decrypt a file
 * @route   GET /api/files/:id/download
 * @access  Private
 */
const downloadFile = async (req, res) => {
  try {
    // Find file record
    const file = await File.findOne({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!file) {
      return res.status(404).json({
        success: false,
        message: 'File not found',
      });
    }

    // Read encrypted file from disk
    const filePath = path.join(getUploadsDir(), file.encryptedName);
    const encryptedBuffer = await fs.readFile(filePath);

    // Decrypt file
    const decryptedBuffer = decryptFile(
      encryptedBuffer,
      file.encryptionIV,
      file.encryptionAuthTag
    );

    // Update access stats
    file.downloadCount += 1;
    file.lastAccessed = new Date();
    await file.save();

    // Set response headers
    res.setHeader('Content-Type', file.mimeType);
    res.setHeader(
      'Content-Disposition',
      `attachment; filename="${encodeURIComponent(file.originalName)}"`
    );
    res.setHeader('Content-Length', decryptedBuffer.length);

    // Send decrypted file
    res.send(decryptedBuffer);
  } catch (error) {
    console.error('Download file error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to download file',
      error: error.message,
    });
  }
};

/**
 * @desc    Update file metadata
 * @route   PUT /api/files/:id
 * @access  Private
 */
const updateFile = async (req, res) => {
  try {
    const { description, tags, isFavorite, category } = req.body;

    const file = await File.findOne({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!file) {
      return res.status(404).json({
        success: false,
        message: 'File not found',
      });
    }

    // Update allowed fields
    if (description !== undefined) file.description = description;
    if (tags !== undefined) file.tags = tags;
    if (isFavorite !== undefined) file.isFavorite = isFavorite;
    if (category !== undefined) file.category = category;

    await file.save();

    res.status(200).json({
      success: true,
      message: 'File updated successfully',
      data: {
        ...file.toObject(),
        formattedSize: formatFileSize(file.fileSize),
      },
    });
  } catch (error) {
    console.error('Update file error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update file',
      error: error.message,
    });
  }
};

/**
 * @desc    Delete a file
 * @route   DELETE /api/files/:id
 * @access  Private
 */
const deleteFile = async (req, res) => {
  try {
    const file = await File.findOne({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!file) {
      return res.status(404).json({
        success: false,
        message: 'File not found',
      });
    }

    // Delete encrypted file from disk
    const filePath = path.join(getUploadsDir(), file.encryptedName);
    try {
      await fs.unlink(filePath);
    } catch (error) {
      console.error('Error deleting file from disk:', error);
      // Continue with database deletion even if file deletion fails
    }

    // Delete file record from database
    await File.deleteOne({ _id: file._id });

    res.status(200).json({
      success: true,
      message: 'File deleted successfully',
    });
  } catch (error) {
    console.error('Delete file error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete file',
      error: error.message,
    });
  }
};

/**
 * @desc    Delete multiple files
 * @route   POST /api/files/delete-multiple
 * @access  Private
 */
const deleteMultipleFiles = async (req, res) => {
  try {
    const { fileIds } = req.body;

    if (!Array.isArray(fileIds) || fileIds.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Invalid file IDs',
      });
    }

    // Find all files
    const files = await File.find({
      _id: { $in: fileIds },
      user: req.user._id,
    });

    if (files.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'No files found',
      });
    }

    // Delete files from disk
    const deletePromises = files.map((file) => {
      const filePath = path.join(getUploadsDir(), file.encryptedName);
      return fs.unlink(filePath).catch((err) => {
        console.error(`Error deleting file ${file.encryptedName}:`, err);
      });
    });

    await Promise.all(deletePromises);

    // Delete file records from database
    await File.deleteMany({
      _id: { $in: fileIds },
      user: req.user._id,
    });

    res.status(200).json({
      success: true,
      message: `${files.length} file(s) deleted successfully`,
      count: files.length,
    });
  } catch (error) {
    console.error('Delete multiple files error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete files',
      error: error.message,
    });
  }
};

module.exports = {
  uploadFile,
  getAllFiles,
  getFileById,
  downloadFile,
  updateFile,
  deleteFile,
  deleteMultipleFiles,
};
