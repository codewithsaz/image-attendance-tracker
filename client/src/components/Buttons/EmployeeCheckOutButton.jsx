import { Button } from "@nextui-org/react";
import { getCheckOutEmployeeData } from "../../data/employeeData";
import useEmployeeStore from "../../store/employeeStore";

const EmployeeCheckOutButton = () => {
  const {
    setRenderTimer,
    setCheckOutTime,
    setWorkingStatus,
    setTotalTimeWorked,
  } = useEmployeeStore((state) => ({
    setCheckOutTime: state.setCheckOutTime,
    setTotalTimeWorked: state.setTotalTimeWorked,
    setEmployee: state.setEmployee,
    setRenderTimer: state.setRenderTimer,
    setWorkingStatus: state.setWorkingStatus,
  }));

  const handleCheckOut = async () => {
    const data = await getCheckOutEmployeeData();
    if (data.success) {
      console.log(data);
      setWorkingStatus("checkedOut");
      setTotalTimeWorked(data.time.totalWorkingTime);

      setCheckOutTime(data.time.checkOutTime);
      setRenderTimer(false);
    }
  };
  return (
    <Button className="bg-orange-500 " onClick={handleCheckOut}>
      Check Out
    </Button>
  );
};

export default EmployeeCheckOutButton;
