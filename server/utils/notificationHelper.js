const Notification = require('../models/Notification');

/**
 * Helper function to create notifications for users
 */
const createNotification = async (userId, title, message, type = 'info', link = null) => {
  try {
    await Notification.create({
      userId,
      title,
      message,
      type,
      link
    });
  } catch (error) {
    console.error('Error creating notification:', error);
  }
};

/**
 * Create welcome notification for new users
 */
const createWelcomeNotification = async (userId) => {
  await createNotification(
    userId,
    'Welcome to CyberShield!',
    'Your security suite is now active. Start by securing your passwords in the Password Manager.',
    'success',
    '/dashboard'
  );
};

/**
 * Create security alert notification
 */
const createSecurityAlert = async (userId, message) => {
  await createNotification(
    userId,
    'Security Alert',
    message,
    'security'
  );
};

module.exports = {
  createNotification,
  createWelcomeNotification,
  createSecurityAlert
};
