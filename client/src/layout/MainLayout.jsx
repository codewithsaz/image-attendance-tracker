import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Navabar from "../components/Navabar";
import useEmployeeStore from "../store/employeeStore";
import { getEmployeeData } from "../data/employeeData";
import LoadingPage from "../pages/LoadingPage";

const MainLayout = () => {
  const [loading, setloading] = useState(true);

  const navigate = useNavigate();
  const {
    employee,
    setEmployee,
    setWorkingStatus,
    setRenderTimer,
    setBreakStatus,
  } = useEmployeeStore((state) => ({
    employee: state.employee,
    setEmployee: state.setEmployee,
    setRenderTimer: state.setRenderTimer,
    setWorkingStatus: state.setWorkingStatus,
    setBreakStatus: state.setBreakStatus,
  }));
  async function fetchData() {
    const data = await getEmployeeData();
    if (data?.success) {
      setEmployee(data.employee);
      setWorkingStatus(data.employee.workingStatus);
      if (data.employee.workingStatus === "checkedIn") {
        setRenderTimer(true);
        if (data.employee.breakStatus) {
          setBreakStatus(true);
        }
      }
    } else {
      navigate("/login", { replace: true });
    }
  }

  useEffect(() => {
    if (JSON.stringify(employee) === "{}") {
      fetchData();
    }
    setTimeout(() => {
      setloading(false);
    }, 500);
  }, []);

  return (
    <>
      {loading ? (
        <LoadingPage />
      ) : (
        <>
          <Navabar />
          <Outlet />
        </>
      )}
    </>
  );
};

export default MainLayout;
