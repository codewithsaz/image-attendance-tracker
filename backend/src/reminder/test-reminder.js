var cron = require("node-cron");
const { sendCheckInReminderMail } = require("../services/mailService");

function sendCheckInReminder() {
  console.log("Cron Job Working");
}

const testJob = cron.schedule("* * * * *", sendCheckInReminder, {
  scheduled: false,
}); // Every day at 9:25 AM

testJob.start();

module.exports = testJob;
