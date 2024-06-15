import { Button } from "@nextui-org/react";
import { getTakeBreakData } from "../../data/employeeData";
import useEmployeeStore from "../../store/employeeStore";

const TakeBreakButton = () => {
  const { setBreakStatus } = useEmployeeStore((state) => ({
    employee: state.employee,
    workingStatus: state.workingStatus,
    setEmployee: state.setEmployee,
    setRenderTimer: state.setRenderTimer,
    setBreakStatus: state.setBreakStatus,
  }));
  const handleTakeBreak = async () => {
    const data = await getTakeBreakData();
    console.log(data);
    if (data.success) {
      console.log(data);
      setBreakStatus(true);
    }
  };
  return <Button onClick={handleTakeBreak}>Take Break</Button>;
};

export default TakeBreakButton;
