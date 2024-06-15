// import React from "react";
import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import AdminNavbar from "../components/AdminNavbar";
import useEmployeeStore from "../store/employeeStore";
import { getVerifyAdminData } from "../data/employeeData";

const AdminLayout = () => {
  const [loading, setloading] = useState(true);
  const navigate = useNavigate();

  const { isAdmin, setAdminStatus } = useEmployeeStore((state) => ({
    employee: state.employee,
    isAdmin: state.isAdmin,
    setEmployee: state.setEmployee,
    setRenderTimer: state.setRenderTimer,
    setWorkingStatus: state.setWorkingStatus,
    setAdminStatus: state.setAdminStatus,
  }));

  async function fetchData() {
    const data = await getVerifyAdminData();
    if (data.success) {
      setAdminStatus(true);
      setloading(false);
    } else {
      alert("You dont have admin rights");
      setAdminStatus(false);
      setloading(false);
      navigate("/dashboard", { replace: true });
    }
  }

  useEffect(() => {
    console.log(isAdmin);
    if (isAdmin === null) {
      console.log(isAdmin);
      fetchData();
    } else if (isAdmin === true) {
      console.log(isAdmin);
      setloading(false);
    } else {
      console.log(isAdmin);
      setloading(false);
      navigate("/dashboard", { replace: true });
    }
    setTimeout(() => {
      setloading(false);
    }, 500);
  }, []);
  return (
    <>
      {loading ? (
        <div>Loading</div>
      ) : (
        <>
          <AdminNavbar />
          <Outlet />
        </>
      )}
    </>
  );
};

export default AdminLayout;
