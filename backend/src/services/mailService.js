const { transporter } = require("../utils/mailHelper");

exports.sendMail = async (mailOption) => {
  try {
    await transporter.sendMail(mailOption);
  } catch (error) {
    console.log(error);
  }
};
exports.sendCheckInReminderMail = async (employees) => {
  const mailOption = {
    from: "your_email@example.com",
    to: employees, // Replace with recipient email addresses
    subject: "Reminder: Check-in Required",
    text: "Don't forget to check in today at 9:25 AM!",
  };
  try {
    await transporter.sendMail(mailOption);
  } catch (error) {
    console.log(error);
  }
};
exports.sendCheckOutReminderMail = async (employees) => {
  const mailOption = {
    from: "your_email@example.com",
    to: employees, // Replace with recipient email addresses
    subject: "Reminder: Check-Out Required",
    text: "Don't forget to check out today at 7:30 PM!",
  };
  try {
    await transporter.sendMail(mailOption);
  } catch (error) {
    console.log(error);
  }
};
