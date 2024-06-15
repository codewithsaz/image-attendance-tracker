import WorkTimer from "./WorkTimer";
import { Card, CardHeader } from "@nextui-org/react";
import useEmployeeStore from "../store/employeeStore";
import EmployeeCheckInButton from "./Buttons/EmployeeCheckInButton";
import {
  calculateTimeDifference,
  formatTimeToHoursMinutes,
} from "../utils/dateFormator";
import EmployeeCheckOutButton from "./Buttons/EmployeeCheckOutButton";
import TakeBreakButton from "./Buttons/TakeBreakButton";
import EndBreakButton from "./Buttons/EndBreakButton";
const EmployeeActions = () => {
  const {
    employee,
    checkInTime,
    checkOutTime,
    workingStatus,
    breakStatus,
    renderTimer,
    totalTimeWorked,
  } = useEmployeeStore((state) => ({
    employee: state.employee,
    totalTimeWorked: state.totalTimeWorked,
    checkInTime: state.checkInTime,
    checkOutTime: state.checkOutTime,
    workingStatus: state.workingStatus,
    breakStatus: state.breakStatus,
    renderTimer: state.renderTimer,
    setEmployee: state.setEmployee,
    setWorkingStatus: state.setWorkingStatus,
  }));

  return (
    <Card className="w-full flex flex-col justify-center items-center min-h-max lg:h-full gap-4  p-4 text-center sm:min-w-72">
      <CardHeader className="w-full bg-zinc-500text-center">
        <h1 className=" w-full font-semibold text-xl text-center">
          Attendance
        </h1>
      </CardHeader>
      <div className="flex flex-col items-center ">
        <h2>Shift Timings</h2>
        <div>
          <span>{employee.shiftStartTime}</span> -{" "}
          <span>{employee.shiftEndTime}</span>
        </div>
      </div>
      <>
        {workingStatus === "checkedIn" ? (
          <WorkTimer
            renderTimer={renderTimer}
            checkInTime={formatTimeToHoursMinutes(employee.checkInTime)}
          />
        ) : (
          <>
            {workingStatus === "checkedOut" ? (
              <div style={{ textAlign: "center" }}>
                <div className=" font-bold text-7xl">{totalTimeWorked}</div>
                <p>HH:MM</p>
                <p>Time Worked</p>
              </div>
            ) : (
              <>
                <div style={{ textAlign: "center" }}>
                  <div className=" font-bold text-7xl">00:00</div>
                  <p>HH:MM</p>
                  <p>Time Worked</p>
                </div>
              </>
            )}
          </>
        )}
      </>

      <>
        {breakStatus ? (
          <p className=" font-semibold text-medium animate-pulse">On Break</p>
        ) : (
          <></>
        )}
      </>

      <div className=" w-full max-w-xs flex gap-2 p-2 bg-neutral-800 text-white justify-center rounded-lg">
        <div className="w-full text-center">
          <p>Check In</p>

          <p>{checkInTime}</p>
        </div>
        <div className="w-full text-center">
          <p>Check Out</p>
          <p>{checkOutTime}</p>
        </div>
      </div>
      <>
        {workingStatus === "checkedOut" ? (
          <div className=" font-semibold text-xl">
            Your work for the day has been completed ! Take rest 😎
          </div>
        ) : (
          <div className="flex flex-col gap-2 w-full max-w-xs">
            {workingStatus === "not-working" ? (
              <EmployeeCheckInButton />
            ) : (
              <EmployeeCheckOutButton />
            )}
            <> {breakStatus ? <EndBreakButton /> : <TakeBreakButton />}</>
          </div>
        )}
      </>
    </Card>
  );
};

export default EmployeeActions;
