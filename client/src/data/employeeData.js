import {
  applyLeave,
  approveLeave,
  checkInEmployee,
  checkOutEmployee,
  createEmployee,
  deleteEmployee,
  endBreak,
  fetchAllPendingLeave,
  getEmployeeDetails,
  getEmployeeDetailsById,
  individualEmployeeAttendance,
  loginEmployee,
  rejectLeave,
  takeBreak,
  verifyAdminRights,
} from "../services/apiService";

export const addEmployee = async (user) => {
  try {
    const response = await createEmployee(user);
    return response.data;
  } catch (error) {
    // Handle error...
    console.log(error);
  }
};

export const getDeleteEmployeeData = async (empID) => {
  try {
    const response = await deleteEmployee(empID);
    return response.data;
  } catch (error) {
    // Handle error...
    console.log(error);
  }
};

export const loginEmployeeData = async (user) => {
  try {
    const response = await loginEmployee(user);
    return response.data;
  } catch (error) {
    // Handle error...
  }
};

export const getEmployeeData = async () => {
  try {
    const response = await getEmployeeDetails();
    return response.data;
  } catch (error) {
    // Handle error...
  }
};
export const getEmployeeByIdData = async (employeeID) => {
  try {
    const response = await getEmployeeDetailsById(employeeID);
    return response.data;
  } catch (error) {
    // Handle error...
  }
};
export const getVerifyAdminData = async () => {
  try {
    const response = await verifyAdminRights();
    return response.data;
  } catch (error) {
    // Handle error...
  }
};
export const getCheckInEmployeeData = async () => {
  try {
    const response = await checkInEmployee();
    return response.data;
  } catch (error) {
    // Handle error...
  }
};
export const getCheckOutEmployeeData = async () => {
  try {
    const response = await checkOutEmployee();
    return response.data;
  } catch (error) {
    // Handle error...
  }
};

export const getTakeBreakData = async () => {
  try {
    const response = await takeBreak();
    return response.data;
  } catch (error) {
    // Handle error...
  }
};
export const getEndBreakData = async () => {
  try {
    const response = await endBreak();
    return response.data;
  } catch (error) {
    // Handle error...
  }
};
export const getIndvidualEmployeeAttendanceHistoryData = async () => {
  try {
    const response = await individualEmployeeAttendance();
    return response.data;
  } catch (error) {
    // Handle error...
  }
};

export const getApplyLeaveData = async (leaveData) => {
  try {
    const response = await applyLeave(leaveData);
    return response.data;
  } catch (error) {
    // Handle error...
  }
};

export const getAllPendingLeaveData = async () => {
  try {
    const response = await fetchAllPendingLeave();
    return response.data;
  } catch (error) {
    // Handle error...
  }
};

export const getApproveLeaveData = async (leaveData) => {
  try {
    const response = await approveLeave(leaveData);
    return response.data;
  } catch (error) {
    // Handle error...
  }
};
export const getRejectLeaveData = async (leaveData) => {
  try {
    const response = await rejectLeave(leaveData);
    return response.data;
  } catch (error) {
    // Handle error...
  }
};
