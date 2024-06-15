// import React from "react";

import { Button } from "@nextui-org/react";
import { Link } from "react-router-dom";
import AllEmployeeTable from "../components/AllEmployeeTable";

const Admin = () => {
  return (
    <div className="w-full h-full p-2">
      <AllEmployeeTable />
    </div>
  );
};

export default Admin;
