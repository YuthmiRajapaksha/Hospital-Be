const nodemailer = require('nodemailer');

let transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'nirajapaksha1998@gmail.com',      // ✅ Your actual Gmail
    pass: 'tnpvqlnygljndqsf'                 // ✅ App Password (DO NOT change this)
  }
});

const mailOptions = {
  from: 'nirajapaksha1998@gmail.com',        // ✅ Use your actual Gmail here too
  to: 'nirajapaksha1998@gmail.com',          // ✅ Use your email to test delivery
  subject: 'Test Email from Nodemailer',
  text: 'This is a test email from your Node.js app using Gmail App Password.'
};

transporter.sendMail(mailOptions, (err, info) => {
  if (err) {
    console.error('❌ Email failed:', err);
  } else {
    console.log('✅ Email sent:', info.response);
  }
});

