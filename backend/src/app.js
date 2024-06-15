require("dotenv").config();

const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const cookieParser = require("cookie-parser");
const app = express();

//Database
const db = require("./utils/database");
//routes
const EmployeeRouter = require("./routes/employeeRoutes");
const AdminRouter = require("./routes/adminRoutes");
const AttendanceRouter = require("./routes/attendanceRoutes");
const LeaveRouter = require("./routes/leaveRoutes");

// cron-jons
// const testJob = require("./reminder/test-reminder");
//reminder
// const checkInJob = require("./reminder/check_in_reminder");
// const checkOutJob = require("./reminder/check_out_reminder");
//updateEmployeeStatus
const updateShiftJob = require("./services/updateEmployeeShiftStatus");

app.use(
  cors({
    origin: "http://localhost:5173",
    allowedHeader: true,
    credentials: true,
  })
);
app.use(helmet());
app.use(cookieParser(process.env.COOKIE_SECRET_KEY));
app.use(express.json());

app.use("/test", (req, res) => {
  res.status(200).json({ success: "true", message: "endpoints are working" });
});
app.use("/api/v1", EmployeeRouter);
app.use("/api/v1", AdminRouter);
app.use("/api/v1", AttendanceRouter);
app.use("/api/v1", LeaveRouter);

app.listen(process.env.PORT, () => {
  console.log("Server Started at ", process.env.PORT);
});
