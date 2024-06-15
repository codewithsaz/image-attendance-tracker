const LeaveRouter = require("express").Router();

const {
  createNewLeave,
  getEmployeeLeave,
  getPendingLeave,
  approveLeave,
  rejectLeave,
  getAllPastEmployeeLeave,
} = require("../controllers/leaveController");
const {
  authenticate,
  verfiyAdminRights,
} = require("../middlewares/authenticator");

LeaveRouter.post("/apply-leave", authenticate, createNewLeave);
LeaveRouter.get("/employee-leave", authenticate, getEmployeeLeave);
LeaveRouter.get("/all-pending-leave", authenticate, getPendingLeave);
// LeaveRouter.get("/all-employee-leave", authenticate, getAllEmployeeLeave);
LeaveRouter.get(
  "/all-employee-past-leave",
  verfiyAdminRights,
  getAllPastEmployeeLeave
);
LeaveRouter.post("/approve-leave", verfiyAdminRights, approveLeave);
LeaveRouter.post("/reject-leave", verfiyAdminRights, rejectLeave);

module.exports = LeaveRouter;
