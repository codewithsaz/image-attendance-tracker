const AdminRouter = require("express").Router();
const {
  registerEmployee,
  verifyAdmin,
} = require("../controllers/adminController");
const {
  getIndvidualEmployeeAttendanceHistoryById,
} = require("../controllers/attendanceController");
const { deleteEmployeeById } = require("../controllers/employeeController");
const { getEmployeeLeaveById } = require("../controllers/leaveController");
const { verfiyAdminRights } = require("../middlewares/authenticator");

AdminRouter.post(
  "/admin/register-employee",
  verfiyAdminRights,
  registerEmployee
);

AdminRouter.get(
  "/admin/delete-employee/:empID",
  verfiyAdminRights,
  deleteEmployeeById
);

AdminRouter.get(
  "/admin/employee-attendance/:empID",
  verfiyAdminRights,
  getIndvidualEmployeeAttendanceHistoryById
);
AdminRouter.get(
  "/admin/employee-leave/:empID",
  verfiyAdminRights,
  getEmployeeLeaveById
);

AdminRouter.get("/verify-admin-rights", verfiyAdminRights, verifyAdmin);

module.exports = AdminRouter;
