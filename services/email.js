const nodemailer = require("nodemailer");
const config = require("config");

const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: config.get("userEmail"),
    pass: config.get("gmailPassword"),
  },
});

const sendVerificationEmail = (email, verificationLink) => {
  const mailOptions = {
    from: config.get("userEmail"),
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
};

const sendReminderEmail = (email, title, dueDate) => {
  const mailOptions = {
    from: config.get("userEmail"),
    to: email,
    subject: "TODO App Reminder",
    html: `<p>Reminder: Your task "${title}" is due on ${dueDate.toDateString()}.</p>`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      console.log("Reminder email sent: " + info.response);
    }
  });
};

module.exports = {
  sendVerificationEmail,
  sendReminderEmail,
};
