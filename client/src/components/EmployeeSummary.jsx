import { Card, CardBody, CardHeader, Image } from "@nextui-org/react";
import useEmployeeStore from "../store/employeeStore";
import profilePhoto from "../assets/profile.jpg";

const EmployeeSummary = () => {
  const { employee } = useEmployeeStore((state) => ({
    employee: state.employee,
  }));
  return (
    <Card className="w-full h-full min-h-96  p-4">
      <CardHeader className="w-full">
        <h1 className="w-full font-bold text-2xl text-center">
          Employee Details
        </h1>
      </CardHeader>
      <CardBody className="w-full h-full flex lg:flex-row items-center gap-2 overflow-auto ">
        <div className=" h-full flex justify-center p-2 ">
          <Image src={profilePhoto} className=" max-h-48 max-w-sm " />
        </div>
        <div className="w-full  flex flex-col gap-2 justify-center  item">
          <p className="flex gap-2">
            <span className="font-semibold">Name:</span>
            <span>{employee.name}</span>
          </p>
          <p className="flex gap-2">
            <span className="font-semibold">Email:</span>
            <span>{employee.email}</span>
          </p>
          <p className="flex gap-2">
            <span className="font-semibold">Employee ID:</span>
            <span>{employee.employeeID}</span>
          </p>
          <p className="flex gap-2">
            <span className="font-semibold">Designation:</span>
            <span>{employee.designation}</span>
          </p>
          <p className="flex gap-2">
            <span className="font-semibold">Shift Timings:</span>
            <span>
              {employee.shiftStartTime} - {employee.shiftEndTime}
            </span>
          </p>
          <p className="flex gap-2">
            <span className="font-semibold">Address:</span>
            <span>{employee.address}</span>
          </p>
        </div>
      </CardBody>
    </Card>
  );
};

export default EmployeeSummary;
