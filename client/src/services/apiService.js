import customAxios from "../utils/customAxios";

export const createEmployee = async (user) => {
  try {
    const response = await customAxios.post(`/admin/register-employee`, user);
    return response; // This will include the response data, status, and other information
  } catch (error) {
    // Handle or throw the error as needed
    console.error("Error creating user:", error);
    throw error;
  }
};

export const deleteEmployee = async (empID) => {
  try {
    const response = await customAxios.get(`/admin/delete-employee/${empID}`);

    return response;
  } catch (error) {
    return error.response;
  }
};

export const loginEmployee = async (user) => {
  try {
    const response = await customAxios.post(`/login`, user);

    return response;
  } catch (error) {
    return error.response;
  }
};

export const logoutEmployee = async () => {
  try {
    const response = await customAxios.get(`/logout`);

    return response;
  } catch (error) {
    return error.response;
  }
};

export const getEmployeeDetails = async () => {
  try {
    const response = await customAxios.get(`/employee-details`);

    return response;
  } catch (error) {
    return error.response;
  }
};

export const getEmployeeDetailsById = async (employeeID) => {
  try {
    const response = await customAxios.get(
      `/employee-details-id/${employeeID}`
    );

    return response;
  } catch (error) {
    return error.response;
  }
};

export const verifyAdminRights = async () => {
  try {
    const response = await customAxios.get(`/verify-admin-rights`);

    return response;
  } catch (error) {
    return error.response;
  }
};

export const checkInEmployee = async () => {
  try {
    const response = await customAxios.get(`/check-in`);

    return response;
  } catch (error) {
    return error.response;
  }
};
export const checkOutEmployee = async () => {
  try {
    const response = await customAxios.get(`/check-out`);

    return response;
  } catch (error) {
    return error.response;
  }
};

export const takeBreak = async () => {
  try {
    const response = await customAxios.get(`/break-start`);

    return response;
  } catch (error) {
    return error.response;
  }
};
export const endBreak = async () => {
  try {
    const response = await customAxios.get(`/break-end`);

    return response;
  } catch (error) {
    return error.response;
  }
};

export const individualEmployeeAttendance = async ({ page = 1, limit = 5 }) => {
  try {
    const response = await customAxios.get(
      `/employee-attendance?${page}&${limit}`
    );

    return response;
  } catch (error) {
    return error.response;
  }
};

export const applyLeave = async (leaveData) => {
  try {
    const response = await customAxios.post(`/apply-leave`, leaveData);

    return response;
  } catch (error) {
    return error.response;
  }
};

export const fetchAllPendingLeave = async () => {
  try {
    const response = await customAxios.get(`/all-pending-leave`);

    return response;
  } catch (error) {
    return error.response;
  }
};

export const approveLeave = async (leaveData) => {
  try {
    const response = await customAxios.post(`/approve-leave`, leaveData);

    return response;
  } catch (error) {
    return error.response;
  }
};
export const rejectLeave = async (leaveData) => {
  try {
    const response = await customAxios.post(`/reject-leave`, leaveData);

    return response;
  } catch (error) {
    return error.response;
  }
};
