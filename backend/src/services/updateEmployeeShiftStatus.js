var cron = require("node-cron");
const employeeModel = require("../models/employeeModel");

async function updateEmployeeShiftStatus() {
  try {
    const filter = {
      employmentStatus: "active", // Update only if not updated today
    };

    const update = {
      workingStatus: "not-working",
      checkInTime: "--:--",
      checkOutTime: "--:--", // Update last shift update time
    };

    await employeeModel.updateMany(filter, update);
    console.log("Employee shift statuses updated successfully!");
  } catch (error) {
    console.error("Error updating employee shift statuses:", error);
  }
}

const updateShiftJob = cron.schedule("0 0 * * *", updateEmployeeShiftStatus, {
  scheduled: false,
});
updateShiftJob.start();
console.log("cron-job-started");

module.exports = updateShiftJob;
