const EmployeeRouter = require("express").Router();
const {
  loginEmployee,
  getEmployeeDeatils,
  getAllEmployeeDeatils,
  logoutUser,
  getEmployeeDeatilsById,
} = require("../controllers/employeeController");
const {
  authenticate,
  verfiyAdminRights,
} = require("../middlewares/authenticator");

EmployeeRouter.post("/login", loginEmployee);
EmployeeRouter.get("/logout", authenticate, logoutUser);

EmployeeRouter.get("/employee-details", authenticate, getEmployeeDeatils);

//admin privalges
EmployeeRouter.get(
  "/all-employee-details",
  verfiyAdminRights,
  getAllEmployeeDeatils
);
EmployeeRouter.get(
  "/employee-details-id/:employeeID",
  verfiyAdminRights,
  getEmployeeDeatilsById
);

module.exports = EmployeeRouter;
