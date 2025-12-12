const fs = require('fs');
const path = require('path');

/**
 * Middleware to log user login activities for ML training
 * This creates a dataset for anomaly detection
 */
const logLoginActivity = async (req, res, next) => {
  // Store original send function
  const originalSend = res.send;
  
  // Override send to capture response
  res.send = function(data) {
    // Check if login was successful
    let success = false;
    try {
      const responseData = typeof data === 'string' ? JSON.parse(data) : data;
      success = responseData.success === true;
    } catch (e) {
      // If parsing fails, assume failure
      success = false;
    }

    // Only log successful logins
    if (success) {
      const loginData = {
        userId: req.user?._id?.toString() || req.body?.email || 'unknown',
        timestamp: new Date().toISOString(),
        ipAddress: req.ip || req.connection?.remoteAddress || 'unknown',
        userAgent: req.headers['user-agent'] || 'unknown',
        success: true,
        endpoint: req.path,
      };

      // Append to logs file asynchronously
      const logPath = path.join(__dirname, '../ml_service/data/login_logs.json');
      
      setImmediate(() => {
        try {
          let logs = [];
          
          // Read existing logs
          if (fs.existsSync(logPath)) {
            const content = fs.readFileSync(logPath, 'utf8');
            logs = content ? JSON.parse(content) : [];
          }
          
          logs.push(loginData);
          
          // Keep only last 10,000 entries to manage file size
          if (logs.length > 10000) {
            logs = logs.slice(-10000);
          }
          
          fs.writeFileSync(logPath, JSON.stringify(logs, null, 2));
        } catch (error) {
          console.error('ML logging error:', error.message);
        }
      });
    }

    // Call original send
    originalSend.call(this, data);
  };

  next();
};

/**
 * Log password creation/update for password strength analysis
 */
const logPasswordActivity = (req, res, next) => {
  if (req.body && req.body.password) {
    const passwordData = {
      userId: req.user?._id?.toString() || 'unknown',
      timestamp: new Date().toISOString(),
      passwordLength: req.body.password.length,
      hasUppercase: /[A-Z]/.test(req.body.password),
      hasLowercase: /[a-z]/.test(req.body.password),
      hasNumbers: /[0-9]/.test(req.body.password),
      hasSpecial: /[!@#$%^&*(),.?":{}|<>]/.test(req.body.password),
      endpoint: req.path,
    };

    const logPath = path.join(__dirname, '../ml_service/data/password_logs.json');
    
    setImmediate(() => {
      try {
        let logs = [];
        
        if (fs.existsSync(logPath)) {
          const content = fs.readFileSync(logPath, 'utf8');
          logs = content ? JSON.parse(content) : [];
        }
        
        logs.push(passwordData);
        
        if (logs.length > 5000) {
          logs = logs.slice(-5000);
        }
        
        fs.writeFileSync(logPath, JSON.stringify(logs, null, 2));
      } catch (error) {
        console.error('Password ML logging error:', error.message);
      }
    });
  }

  next();
};

module.exports = { 
  logLoginActivity,
  logPasswordActivity 
};
