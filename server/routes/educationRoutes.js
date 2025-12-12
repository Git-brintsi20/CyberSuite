const express = require('express');
const router = express.Router();
const {
  getCourses,
  getCourse,
  updateProgress,
  getProgress
} = require('../controllers/educationController');
const { protect } = require('../middleware/auth');

// All routes are protected
router.use(protect);

router.get('/courses', getCourses);
router.get('/courses/:courseId', getCourse);
router.post('/progress', updateProgress);
router.get('/progress', getProgress);

module.exports = router;
