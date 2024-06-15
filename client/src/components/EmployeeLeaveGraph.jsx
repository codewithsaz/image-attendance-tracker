import { Card, CardBody, CardHeader } from "@nextui-org/react";

import useEmployeeStore from "../store/employeeStore";

const EmployeeLeaveGraph = () => {
  const { employee } = useEmployeeStore((state) => ({
    employee: state.employee,
  }));
  return (
    <Card className="w-full h-full min-h-96 p-4">
      <CardHeader className="w-full">
        <h1 className="w-full font-bold text-2xl text-center">
          Leave Analysis
        </h1>
      </CardHeader>
      <CardBody className="flex flex-col justify-center gap-2">
        <div className="flex h-full w-full gap-2">
          <Card className="flex w-full gap-2 p-2 justify-center items-center border-2 border-orange-500 ">
            <span className="font-semibold">Total Day Worked</span>
            <span>{employee.totalDaysWorked}</span>
          </Card>
          <Card className="flex w-full gap-2 p-2 justify-center items-center border-2 border-orange-500  ">
            <span className="font-semibold">Total Leave </span>
            <span>{employee.totalLeaveAvailable}</span>
          </Card>
        </div>
        <div className="flex h-full w-full gap-2">
          <Card className="flex w-full gap-2 p-2 justify-center items-center shadow-none border-2 border-orange-500 ">
            <span className="font-semibold">Leave Taken</span>
            <span>{employee.totalLeaveTaken}</span>
          </Card>
          <Card className="flex w-full gap-2 p-2 justify-center items-center border-2 border-orange-500  ">
            <span className="font-semibold">Leave Remaing</span>
            <span>
              {Number(employee.totalLeaveAvailable) -
                Number(employee.totalLeaveTaken)}
            </span>
          </Card>
        </div>
      </CardBody>
    </Card>
  );
};

export default EmployeeLeaveGraph;
