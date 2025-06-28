const nodemailer = require("nodemailer");

// Replace with your Gmail address and App Password
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'nirajapaksha1998@gmail.com',
    pass: 'yuhx mkmg ecsw eado', // Gmail app password
  },
});

// exports.sendAppointmentEmail = async ({
//   patientName,
//   email,
//   doctorName,
//   hospital,
//   sessionDate,
//   sessionTime,
// }) => {
//   const mailOptions = {
//     from: 'nirajapaksha1998@gmail.com',
//     to: email,
//     subject: 'Confirmation of Your Appointment',
//     html: `
//         <!DOCTYPE html>
// <html lang="en">
// <head>
//   <meta charset="UTF-8" />
//   <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
//   <title>Appointment Confirmation</title>
//   <style>
//     body {
//       background-color: #f5f7fa;
//       font-family: Arial, sans-serif;
//       margin: 0;
//       padding: 0;
//     }
//     .email-container {
//       max-width: 600px;
//       margin: 30px auto;
//       background-color: #ffffff;
//       border-radius: 8px;
//       overflow: hidden;
//       box-shadow: 0 2px 8px rgba(0,0,0,0.05);
//     }
//     .header {
//       background-color: #0b5ed7;
//       color: #ffffff;
//       padding: 20px 30px;
//       text-align: center;
//     }
//     .header h1 {
//       margin: 0;
//       font-size: 24px;
//     }
//     .content {
//       padding: 30px;
//       color: #333333;
//     }
//     .content h2 {
//       margin-top: 0;
//       color: #0b5ed7;
//     }
//     .details {
//       margin: 20px 0;
//     }
//     .details p {
//       margin: 8px 0;
//       line-height: 1.5;
//     }
//     .footer {
//       background-color: #f0f0f0;
//       padding: 20px 30px;
//       text-align: center;
//       font-size: 12px;
//       color: #777777;
//     }
//   </style>
// </head>
// <body>
//   <div class="email-container">
//     <div class="header">
//       <h1>Book Appointment</h1>
//     </div>
//     <div class="content">
//       <h2>Confirm Your Booking Details</h2>
//       <div class="details">
//         <p><strong>Doctor:</strong> $(doctorName)</p>
//         <p><strong>Hospital:</strong> $(hospital)</p>
//         <p><strong>Session Date:</strong> $(sessionDate)</p>
//         <p><strong>Session Time:</strong>$(sessionTime)</p>
//         <p><strong>Patient Name:</strong> $(patientName)</p>
//         <p><strong>Phone:</strong> 0778588920</p>
//         <p><strong>Country:</strong> Sri Lanka</p>
//         <p><strong>NIC:</strong> 200077704279</p>
//         <p><strong>Email:</strong> yuthmirajapaksha@gmail.com</p>
//         <p><strong>Charge:</strong> LKR 2,500</p>
//       </div>
//       <p>Thank you for booking your appointment with us.</p>
//     </div>
//     <div class="footer">
//       &copy; 2025 Your Hospital Name. All rights reserved.
//     </div>
//   </div>
// </body>
// </html>

//     `,
//   };

//   transporter.sendMail(mailOptions, function (error, info) {
//         if (error) {
//             console.log(error);
//         } else {
//             console.log('Email sent: ' + info.response);
//         }
//     });
// };



exports.sendAppointmentEmail = async ({
  patientName,
  email,
  doctorName,
  hospital,
  sessionDate,
  sessionTime,
  phone,
  country,
  nic,
  charge
}) => {
  const mailOptions = {
    from: 'nirajapaksha1998@gmail.com',
    to: email,
    subject: 'Confirmation of Your Appointment',
    html: `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
        <title>Appointment Confirmation</title>
        <style>
          body {
            background-color: #f5f7fa;
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
          }
          .email-container {
            max-width: 600px;
            margin: 30px auto;
            background-color: #ffffff;
            border-radius: 8px;
            overflow: hidden;
            box-shadow: 0 2px 8px rgba(0,0,0,0.05);
          }
          .header {
            background-color: #0b5ed7;
            color: #ffffff;
            padding: 20px 30px;
            text-align: center;
          }
          .header h1 {
            margin: 0;
            font-size: 24px;
          }
          .content {
            padding: 30px;
            color: #333333;
          }
          .content h2 {
            margin-top: 0;
            color: #0b5ed7;
          }
          .details {
            margin: 20px 0;
          }
          .details p {
            margin: 8px 0;
            line-height: 1.5;
          }
          .footer {
            background-color: #f0f0f0;
            padding: 20px 30px;
            text-align: center;
            font-size: 12px;
            color: #777777;
          }
        </style>
      </head>
      <body>
        <div class="email-container">
          <div class="header">
            <h1>Book Appointment</h1>
          </div>
          <div class="content">
            <h2>Confirm Your Booking Details</h2>
            <div class="details">
              <p><strong>Doctor:</strong> ${doctorName}</p>
              <p><strong>Hospital:</strong> ${hospital}</p>
              <p><strong>Session Date:</strong> ${sessionDate}</p>
              <p><strong>Session Time:</strong> ${sessionTime}</p>
              <p><strong>Patient Name:</strong> ${patientName}</p>
              <p><strong>Phone:</strong> ${phone}</p>
              <p><strong>Country:</strong> ${country}</p>
              <p><strong>NIC:</strong> ${nic}</p>
              <p><strong>Email:</strong> ${email}</p>
              <p><strong>Charge:</strong> LKR ${charge}</p>
            </div>
            <p>Thank you for booking your appointment with us.</p>
          </div>
          <div class="footer">
            &copy; 2025 Your Hospital Name. All rights reserved.
          </div>
        </div>
      </body>
      </html>
    `,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log('❌ Email send failed:', error);
    } else {
      console.log('✅ Email sent:', info.response);
    }
  });
};
