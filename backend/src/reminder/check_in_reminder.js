var cron = require("node-cron");
const { sendCheckInReminderMail } = require("../services/mailService");

async function sendCheckInReminder() {
  try {
    const activeEmployees = await employeeModel.find(
      { employmentStatus: "active" },
      { email: 1 }
    );
    const activeEmployeeEmails = activeEmployees.map(
      (employee) => employee.email
    );

    await sendCheckInReminderMail(activeEmployeeEmails);
  } catch (error) {
    console.log("Cant send reminder Mail");
  }
}

const checkInJob = cron.schedule("25 9 * * *", sendCheckInReminder, {
  scheduled: false,
}); // Every day at 9:25 AM

checkInJob.start();

module.exports = checkInJob;
