const nodemailer = require("nodemailer");
require("dotenv").config();

console.log(process.env.NODE_MAILER_EMAIL);

exports.transporter = nodemailer.createTransport({
  service: "Gmail",
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.NODE_MAILER_EMAIL,
    pass: process.env.NODE_MAILER_PASS,
  },
});
