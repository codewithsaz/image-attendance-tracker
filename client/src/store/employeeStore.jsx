import { create } from "zustand";

const initialState = {
  employee: {},
  name: "",
  email: "",
  employeeID: "",
  designation: "",
  address: "",
  workingStatus: "not-working",
  breakStatus: false,
  checkInTime: "--:--",
  checkOutTime: "--:--",
  totalTimeWorked: "--:--",
  shiftStartTime: "--:--",
  shiftEndTime: "--:--",
  totalLeaveAvailable: 0,
  totalLeaveTaken: 0,
  totalDaysWorked: 0,
  isAdmin: null,
  renderTimer: false,
};

const useEmployeeStore = create((set) => ({
  ...initialState,

  setEmployee: (employee) =>
    set(() => ({
      employee: employee,
      name: employee.name,
      email: employee.email,
      employeeID: employee.employeeID,
      designation: employee.designation,
      address: employee.address,
      workingStatus: employee.workingStatus,
      breakStatus: employee.breakStatus,
      checkInTime: employee.checkInTime,
      checkOutTime: employee.checkOutTime,
      shiftStartTime: employee.shiftStartTime,
      shiftEndTime: employee.shiftEndTime,
      totalLeaveAvailable: employee.totalLeaveAvailable,
      totalLeaveTaken: employee.totalLeaveTaken,
      totalDaysWorked: employee.totalDaysWorked,
      isAdmin: employee.isAdmin,
    })),
  setWorkingStatus: (status) =>
    set(() => ({
      workingStatus: status,
    })),
  setRenderTimer: (status) =>
    set(() => ({
      renderTimer: status,
    })),
  setCheckInTime: (status) =>
    set(() => ({
      checkInTime: status,
    })),
  setCheckOutTime: (status) =>
    set(() => ({
      checkOutTime: status,
    })),
  setTotalTimeWorked: (status) =>
    set(() => ({
      totalTimeWorked: status,
    })),
  setBreakStatus: (status) =>
    set(() => ({
      breakStatus: status,
    })),
  setAdminStatus: (state) =>
    set(() => ({
      isAdmin: state,
    })),
  reset: () => {
    set(initialState);
  },
}));

export default useEmployeeStore;
