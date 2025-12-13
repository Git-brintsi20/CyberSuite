const nodemailer = require('nodemailer');

/**
 * Email sending utility using Gmail SMTP
 * Sends real emails for password reset and notifications
 */

const sendEmail = async (options) => {
  const { email, subject, message, html } = options;

  try {
    // Create transporter with Gmail SMTP
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT),
      secure: false, // Use STARTTLS
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
      tls: {
        rejectUnauthorized: false // Allow self-signed certificates in development
      }
    });

    // Verify connection
    await transporter.verify();
    console.log('✅ SMTP server connection verified');

    // Email options
    const mailOptions = {
      from: process.env.EMAIL_FROM || `CyberSuite Security <${process.env.SMTP_USER}>`,
      to: email,
      subject: subject,
      text: message,
      html: html || message, // Prefer HTML if provided
    };

    // Send email
    const info = await transporter.sendMail(mailOptions);
    
    console.log('\n📧 ========== EMAIL SENT ===========');
    console.log(`✅ Message ID: ${info.messageId}`);
    console.log(`📬 To: ${email}`);
    console.log(`📝 Subject: ${subject}`);
    console.log('===================================\n');

    return {
      success: true,
      messageId: info.messageId,
      message: 'Email sent successfully'
    };
  } catch (error) {
    console.error('❌ Email sending failed:', error.message);
    throw new Error(`Failed to send email: ${error.message}`);
  }
};

module.exports = sendEmail;
