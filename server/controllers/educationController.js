const Course = require('../models/Course');
const UserProgress = require('../models/UserProgress');

/**
 * @desc    Get all courses
 * @route   GET /api/education/courses
 * @access  Private
 */
const getCourses = async (req, res) => {
  try {
    const courses = await Course.find({ isPublished: true })
      .select('-modules.lessons.content'); // Don't send full content in list

    // Get user progress for each course
    const userId = req.user.id;
    const progressData = await UserProgress.find({ user: userId });
    
    const coursesWithProgress = courses.map(course => {
      const progress = progressData.find(p => p.courseId === course.courseId);
      return {
        ...course.toObject(),
        progress: progress ? progress.progress : 0,
        lessonsCount: course.modules.reduce((sum, mod) => sum + mod.lessons.length, 0)
      };
    });

    res.status(200).json({
      success: true,
      count: coursesWithProgress.length,
      data: coursesWithProgress
    });
  } catch (error) {
    console.error('Get courses error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch courses'
    });
  }
};

/**
 * @desc    Get single course with modules
 * @route   GET /api/education/courses/:courseId
 * @access  Private
 */
const getCourse = async (req, res) => {
  try {
    const course = await Course.findOne({ courseId: req.params.courseId });

    if (!course) {
      return res.status(404).json({
        success: false,
        message: 'Course not found'
      });
    }

    // Get user progress
    const progress = await UserProgress.findOne({
      user: req.user.id,
      courseId: course.courseId
    });

    res.status(200).json({
      success: true,
      data: {
        ...course.toObject(),
        userProgress: progress || { progress: 0, completedLessons: [] }
      }
    });
  } catch (error) {
    console.error('Get course error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch course'
    });
  }
};

/**
 * @desc    Update user progress
 * @route   POST /api/education/progress
 * @access  Private
 */
const updateProgress = async (req, res) => {
  try {
    const { courseId, moduleId, lessonId } = req.body;

    if (!courseId || moduleId === undefined || lessonId === undefined) {
      return res.status(400).json({
        success: false,
        message: 'courseId, moduleId, and lessonId are required'
      });
    }

    // Find or create progress
    let progress = await UserProgress.findOne({
      user: req.user.id,
      courseId
    });

    if (!progress) {
      progress = await UserProgress.create({
        user: req.user.id,
        courseId,
        completedLessons: []
      });
    }

    // Check if lesson already completed
    const alreadyCompleted = progress.completedLessons.some(
      cl => cl.moduleId === moduleId && cl.lessonId === lessonId
    );

    if (!alreadyCompleted) {
      progress.completedLessons.push({
        moduleId,
        lessonId,
        completedAt: new Date()
      });

      // Calculate progress percentage
      const course = await Course.findOne({ courseId });
      if (course) {
        const totalLessons = course.modules.reduce((sum, mod) => sum + mod.lessons.length, 0);
        progress.progress = Math.round((progress.completedLessons.length / totalLessons) * 100);
        
        // Mark as completed if all lessons done
        if (progress.progress >= 100) {
          progress.completedAt = new Date();
        }
      }

      await progress.save();
    }

    res.status(200).json({
      success: true,
      message: 'Progress updated',
      data: progress
    });
  } catch (error) {
    console.error('Update progress error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update progress'
    });
  }
};

/**
 * @desc    Get user progress for all courses
 * @route   GET /api/education/progress
 * @access  Private
 */
const getProgress = async (req, res) => {
  try {
    const progress = await UserProgress.find({ user: req.user.id });

    res.status(200).json({
      success: true,
      data: progress
    });
  } catch (error) {
    console.error('Get progress error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch progress'
    });
  }
};

module.exports = {
  getCourses,
  getCourse,
  updateProgress,
  getProgress
};
