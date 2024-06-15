var cron = require("node-cron");
const { sendCheckOutReminderMail } = require("../services/mailService");

async function sendCheckOutReminder() {
  try {
    const activeEmployees = await employeeModel.find(
      { employmentStatus: "active" },
      { email: 1 }
    );
    const activeEmployeeEmails = activeEmployees.map(
      (employee) => employee.email
    );

    await sendCheckOutReminderMail(activeEmployeeEmails);
  } catch (error) {
    console.log("Cant send reminder Mail");
  }
}

const checkOutJob = cron.schedule("30 19 * * *", sendCheckOutReminder, {
  scheduled: false,
}); // Every day at 7:30 PM

checkOutJob.start();

module.exports = checkOutJob;
