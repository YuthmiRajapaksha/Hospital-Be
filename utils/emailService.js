const nodemailer = require("nodemailer");

// Replace with your Gmail address and App Password
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "yourgmail@gmail.com",
    pass: "your_app_password_here", // 🔐 Use App Password, not Gmail login
  },
});

exports.sendAppointmentEmail = async ({
  patientName,
  email,
  doctorName,
  hospital,
  sessionDate,
  sessionTime,
}) => {
  const mailOptions = {
    from: '"Hospital Booking" <yourgmail@gmail.com>',
    to: email,
    subject: "Appointment Confirmation",
    html: `
      <h2>Hi ${patientName},</h2>
      <p>Your appointment has been successfully booked.</p>
      <p><strong>Doctor:</strong> Dr. ${doctorName}</p>
      <p><strong>Hospital:</strong> ${hospital}</p>
      <p><strong>Session Date:</strong> ${sessionDate}</p>
      <p><strong>Session Time:</strong> ${sessionTime}</p>
      <br />
      <p>Thank you for using our service.</p>
    `,
  };

  await transporter.sendMail(mailOptions);
};
