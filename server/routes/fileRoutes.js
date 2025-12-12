const express = require('express');
const router = express.Router();
const {
  uploadFile,
  getAllFiles,
  getFileById,
  downloadFile,
  updateFile,
  deleteFile,
  deleteMultipleFiles,
} = require('../controllers/fileController');
const { protect } = require('../middleware/auth');

// All routes require authentication
router.use(protect);

// @route   POST /api/files/upload
// @desc    Upload and encrypt a file
// @access  Private
router.post('/upload', uploadFile);

// @route   GET /api/files
// @desc    Get all files for user
// @access  Private
router.get('/', getAllFiles);

// @route   POST /api/files/delete-multiple
// @desc    Delete multiple files
// @access  Private
router.post('/delete-multiple', deleteMultipleFiles);

// @route   GET /api/files/:id
// @desc    Get file metadata
// @access  Private
router.get('/:id', getFileById);

// @route   GET /api/files/:id/download
// @desc    Download and decrypt file
// @access  Private
router.get('/:id/download', downloadFile);

// @route   PUT /api/files/:id
// @desc    Update file metadata
// @access  Private
router.put('/:id', updateFile);

// @route   DELETE /api/files/:id
// @desc    Delete a file
// @access  Private
router.delete('/:id', deleteFile);

module.exports = router;
