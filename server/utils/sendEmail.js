/**
 * Email sending utility
 * For development: Logs email to console
 * For production: Configure with nodemailer or email service
 */

const sendEmail = async (options) => {
  const { email, subject, message, html } = options;

  // In development, just log the email
  if (process.env.NODE_ENV === 'development') {
    console.log('\n📧 ========== EMAIL ===========');
    console.log(`To: ${email}`);
    console.log(`Subject: ${subject}`);
    console.log('\nMessage:');
    console.log(message || html);
    console.log('==============================\n');
    
    return {
      success: true,
      message: 'Email logged to console (development mode)'
    };
  }

  // TODO: For production, implement with nodemailer or email service
  // Example with nodemailer:
  /*
  const nodemailer = require('nodemailer');
  
  const transporter = nodemailer.createTransporter({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS
    }
  });

  const info = await transporter.sendMail({
    from: `${process.env.FROM_NAME} <${process.env.FROM_EMAIL}>`,
    to: email,
    subject: subject,
    text: message,
    html: html
  });

  return info;
  */

  throw new Error('Email service not configured for production');
};

module.exports = sendEmail;
