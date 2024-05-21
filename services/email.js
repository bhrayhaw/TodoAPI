// services/email.js
const nodemailer = require("nodemailer");
const config = require("config");

const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: config.get('userEmail'),
    pass: config.get('gmailPassword'),
  },
});

module.exports = {
  sendVerificationEmail: (email, verificationLink) => {
    const mailOptions = {
      from: config.get('userEmail'),
      to: email,
      subject: "TODO App Email Verification",
      html: `<p>Click <a href="${verificationLink}">here</a> to verify your email address.</p>`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });
  },
};
