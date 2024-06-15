import { useEffect, useState } from "react";
import { Button, Card, CardBody, CardHeader } from "@nextui-org/react";
import { useNavigate, useParams } from "react-router-dom";
import {
  getDeleteEmployeeData,
  getEmployeeByIdData,
} from "../data/employeeData";
import AttendanceHistoryTable from "../components/AttendanceHistoryTable";
import LeaveHistoryTable from "../components/LeaveHistoryTable";

const AdminEmployeeProfile = () => {
  let { empID } = useParams();
  const naviagte = useNavigate();
  const [employeeData, setemployeeData] = useState("");
  useEffect(() => {
    const fetchData = async () => {
      const response = await getEmployeeByIdData(empID);
      if (response.success) {
        setemployeeData(response.employee);
      }
    };

    fetchData();

    return () => {};
  }, []);

  const handleDeleteEmployee = async () => {
    const response = await getDeleteEmployeeData(empID);
    console.log(response);

    if (response.success) {
      alert("Employee has been delete");
      naviagte("/admin", { replace: true });
    } else {
      alert("Employee deletion failed");
    }
  };

  return (
    <div className="w-full h-full p-2">
      <div>
        <Card className="w-full h-full p-4">
          <CardHeader className="flex justify-between">
            <p className="font-bold text-2xl">Employee Details</p>
            <>
              {employeeData.employmentStatus === "active" ? (
                <Button color="danger" onClick={handleDeleteEmployee}>
                  Delete Employee
                </Button>
              ) : (
                <p className="font-semibold text-red-700 text-xl">
                  InActive(Deleted)
                </p>
              )}
            </>
          </CardHeader>

          <CardBody>
            <p className="flex gap-2">
              <span className="font-semibold">Name:</span>
              <span>{employeeData.name}</span>
            </p>
            <p className="flex gap-2">
              <span className="font-semibold">Email:</span>
              <span>{employeeData.email}</span>
            </p>
            <p className="flex gap-2">
              <span className="font-semibold">Employee ID:</span>
              <span>{employeeData.employeeID}</span>
            </p>
            <p className="flex gap-2">
              <span className="font-semibold">Designation:</span>
              <span>{employeeData.designation}</span>
            </p>
            <p className="flex gap-2">
              <span className="font-semibold">Shift Timings:</span>
              <span>
                {employeeData.shiftStartTime} - {employeeData.shiftEndTime}
              </span>
            </p>
            <p className="flex gap-2">
              <span className="font-semibold">totalLeaveAvailable:</span>
              <span>{employeeData.totalLeaveAvailable}</span>
            </p>
            <p className="flex gap-2">
              <span className="font-semibold">totalLeaveTaken:</span>
              <span>{employeeData.totalLeaveTaken}</span>
            </p>
          </CardBody>
        </Card>
      </div>
      <AttendanceHistoryTable employeeID={empID} />
      <LeaveHistoryTable employeeID={empID} />
    </div>
  );
};

export default AdminEmployeeProfile;
