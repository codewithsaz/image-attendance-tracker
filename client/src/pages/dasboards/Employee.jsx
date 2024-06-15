// import React from "react";

import EmployeeActions from "../../components/EmployeeActions";
import EmployeeAttendanceGraph from "../../components/EmployeeAttendanceGraph";
import EmployeeLeaveGraph from "../../components/EmployeeLeaveGraph";
import EmployeeSummary from "../../components/EmployeeSummary";

const Employee = () => {
  return (
    <div className="w-full h-full flex flex-col lg:flex-row-reverse  gap-2 border-2 ">
      <div className="w-full lg:max-w-sm p-2">
        <EmployeeActions />
      </div>
      <div className="w-full h-full flex flex-col  overflow-auto ">
        <div className="h-full  flex flex-col lg:flex-auto xl:flex-row  gap-2 p-2">
          <EmployeeSummary />

          <EmployeeLeaveGraph />
        </div>
        <div className=" w-full h-full flex p-2 ">
          <EmployeeAttendanceGraph />
        </div>
      </div>
    </div>
  );
};

export default Employee;
