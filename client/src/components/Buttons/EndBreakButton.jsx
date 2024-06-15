import { Button } from "@nextui-org/react";
import { getEndBreakData } from "../../data/employeeData";
import useEmployeeStore from "../../store/employeeStore";

const EndBreakButton = () => {
  const { setBreakStatus } = useEmployeeStore((state) => ({
    employee: state.employee,
    workingStatus: state.workingStatus,
    setEmployee: state.setEmployee,
    setRenderTimer: state.setRenderTimer,
    setBreakStatus: state.setBreakStatus,
  }));
  const handleEndBreak = async () => {
    const data = await getEndBreakData();
    console.log(data);
    if (data.success) {
      console.log(data);
      setBreakStatus(false);
    }
  };
  return <Button onClick={handleEndBreak}>End Break</Button>;
};

export default EndBreakButton;
