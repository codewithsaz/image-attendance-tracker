import { Button } from "@nextui-org/react";
import { getCheckInEmployeeData } from "../../data/employeeData";
import useEmployeeStore from "../../store/employeeStore";

const EmployeeCheckInButton = () => {
  const { setCheckInTime, setWorkingStatus, setRenderTimer } = useEmployeeStore(
    (state) => ({
      employee: state.employee,
      setCheckInTime: state.setCheckInTime,
      setEmployee: state.setEmployee,
      setRenderTimer: state.setRenderTimer,
      setWorkingStatus: state.setWorkingStatus,
    })
  );
  const handleCheckIn = async () => {
    const data = await getCheckInEmployeeData();
    if (data.success) {
      setWorkingStatus("checkedIn");
      setCheckInTime(data.time.checkInTime);
      setRenderTimer(true);
    }
  };
  return (
    <Button className="bg-orange-500 " onClick={handleCheckIn}>
      Check IN
    </Button>
  );
};

export default EmployeeCheckInButton;
