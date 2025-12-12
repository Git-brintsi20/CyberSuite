const User = require('../models/User');
const Credential = require('../models/Credential');
const File = require('../models/File');
const Notification = require('../models/Notification');

/**
 * @desc    Get dashboard statistics
 * @route   GET /api/dashboard/stats
 * @access  Private
 */
const getDashboardStats = async (req, res) => {
  try {
    const userId = req.user.id;

    // Get counts in parallel
    const [
      passwordCount,
      fileCount,
      fileStats,
      notificationCount,
      unreadNotificationCount,
    ] = await Promise.all([
      Credential.countDocuments({ user: userId }),
      File.countDocuments({ user: userId }),
      File.aggregate([
        { $match: { user: req.user._id } },
        {
          $group: {
            _id: null,
            totalSize: { $sum: '$fileSize' },
          },
        },
      ]),
      Notification.countDocuments({ user: userId }),
      Notification.countDocuments({ user: userId, isRead: false }),
    ]);

    // Calculate total file size
    const totalFileSize = fileStats.length > 0 ? fileStats[0].totalSize : 0;
    const totalFileSizeInMB = (totalFileSize / (1024 * 1024)).toFixed(2);

    // Get recent credentials
    const recentPasswords = await Credential.find({ user: userId })
      .sort({ createdAt: -1 })
      .limit(5)
      .select('siteName createdAt');

    // Get recent files
    const recentFiles = await File.find({ user: userId })
      .sort({ createdAt: -1 })
      .limit(5)
      .select('originalName fileSize createdAt');

    res.status(200).json({
      success: true,
      data: {
        passwords: {
          total: passwordCount,
          recentCount: recentPasswords.length,
        },
        files: {
          total: fileCount,
          totalSizeMB: totalFileSizeInMB,
          recentCount: recentFiles.length,
        },
        notifications: {
          total: notificationCount,
          unread: unreadNotificationCount,
        },
        recentActivity: {
          passwords: recentPasswords,
          files: recentFiles,
        },
      },
    });
  } catch (error) {
    console.error('Get dashboard stats error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch dashboard statistics',
    });
  }
};

/**
 * @desc    Get activity chart data (24-hour login and password creation activity)
 * @route   GET /api/dashboard/activity
 * @access  Private
 */
const getActivityData = async (req, res) => {
  try {
    const userId = req.user.id;

    // Get the last 24 hours
    const now = new Date();
    const last24Hours = new Date(now - 24 * 60 * 60 * 1000);

    // Create 4-hour intervals for the chart
    const intervals = [];
    for (let i = 0; i < 7; i++) {
      const intervalStart = new Date(last24Hours.getTime() + i * 4 * 60 * 60 * 1000);
      const intervalEnd = new Date(intervalStart.getTime() + 4 * 60 * 60 * 1000);
      
      intervals.push({
        start: intervalStart,
        end: intervalEnd,
        label: intervalStart.getHours().toString().padStart(2, '0') + ':00',
      });
    }

    // Get password creation counts per interval
    const activityData = await Promise.all(
      intervals.map(async (interval) => {
        const [passwordsCreated, filesUploaded] = await Promise.all([
          Credential.countDocuments({
            user: userId,
            createdAt: { $gte: interval.start, $lt: interval.end },
          }),
          File.countDocuments({
            user: userId,
            createdAt: { $gte: interval.start, $lt: interval.end },
          }),
        ]);

        return {
          time: interval.label,
          passwords: passwordsCreated,
          files: filesUploaded,
        };
      })
    );

    res.status(200).json({
      success: true,
      data: activityData,
    });
  } catch (error) {
    console.error('Get activity data error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch activity data',
    });
  }
};

module.exports = {
  getDashboardStats,
  getActivityData,
};
