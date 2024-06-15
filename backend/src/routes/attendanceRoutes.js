const {
  checkIn,
  checkOut,
  breakIn,
  breakout,
  getIndvidualEmployeeAttendanceHistory,
} = require("../controllers/attendanceController");
const { authenticate } = require("../middlewares/authenticator");

const AttendanceRouter = require("express").Router();

AttendanceRouter.get("/check-in", authenticate, checkIn);
AttendanceRouter.get("/check-out", authenticate, checkOut);
AttendanceRouter.get("/break-start", authenticate, breakIn);
AttendanceRouter.get("/break-end", authenticate, breakout);

AttendanceRouter.get(
  "/employee-attendance",
  authenticate,
  getIndvidualEmployeeAttendanceHistory
);

module.exports = AttendanceRouter;
