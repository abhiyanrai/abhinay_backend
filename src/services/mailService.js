const nodemailer = require("nodemailer");
require("dotenv").config();

const transporter = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port: parseInt(process.env.MAIL_PORT),
  secure: false, // false for STARTTLS (port 587)
  auth: {
    user: process.env.MAIL_USERNAME,
    pass: process.env.MAIL_PASSWORD,
  },
  tls: {
    rejectUnauthorized: false, // Optional, can help with self-signed certs
  },
  pool: true,
  maxConnections: 5,
  maxMessages: 100,
});

// Test the transporter connection
transporter.verify((error, success) => {
  if (error) {
    console.error("SMTP Connection Error:", error);
  } else {
    console.log("✅ SMTP Connection Successful");
  }
});

const sendEmail = async ({ to, subject, html }) => {
  try {
    const mailOptions = {
      from: `"${process.env.MAIL_FROM_NAME}" <${process.env.MAIL_FROM_ADDRESS}>`,
      to,
      subject,
      html,
    };
    const info = await transporter.sendMail(mailOptions);
    console.log("✅ Email Sent:", info.messageId);
    return info;
  } catch (error) {
    console.error("❌ Error sending email:", error.stack);
    throw new Error(`Failed to send email: ${error.message}`);
  }
};

module.exports = { sendEmail };
