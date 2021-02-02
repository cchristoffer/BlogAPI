const nodemailer = require('nodemailer');

const sendEmail = async (options) => {
  //Options for transporter
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_POST,
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    },
  });
  //email options
  const mailOptions = {
    from: 'Christoffer Helgemo <cchristoffer@live.se>',
    to: options.email,
    subject: options.subject,
    text: options.message,
  };

  //Send email with transporter
  await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;
