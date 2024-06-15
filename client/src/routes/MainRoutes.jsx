import { createBrowserRouter } from "react-router-dom";
import Login from "../pages/Login";
import Home from "../pages/Home";
import Employee from "../pages/dasboards/Employee";
import Admin from "../pages/Admin";
import AdminDashboard from "../pages/dasboards/AdminDashboard";
import MainLayout from "../layout/MainLayout";
import AdminLayout from "../layout/AdminLayout";
import NewEmplyoyee from "../pages/NewEmplyoyee";
import AttendaceHistory from "../pages/AttendaceHistory";
import LeaveHistory from "../pages/LeaveHistory";
import NotFound from "../pages/NotFound";
import AdminEmployeeProfile from "../pages/AdminEmployeeProfile";
import LeaveRequest from "../pages/LeaveRequest";
const mainrouter = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <NotFound />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    element: <MainLayout />,
    children: [
      {
        path: "/dashboard",
        element: <Employee />,
      },
      {
        path: "/leave-history",
        element: <LeaveHistory />,
      },
      {
        path: "/attendance-history",
        element: <AttendaceHistory />,
      },
    ],
  },
  {
    element: <AdminLayout />,
    children: [
      {
        path: "/admin",
        children: [
          {
            path: "",
            element: <Admin />,
          },
          {
            path: "employee/:empID",
            element: <AdminEmployeeProfile />,
          },
          {
            path: "dashboard",
            element: <AdminDashboard />,
          },
          {
            path: "leave-request",
            element: <LeaveRequest />,
          },
          {
            path: "new-employee",
            element: <NewEmplyoyee />,
          },
        ],
      },
    ],
  },
]);

export default mainrouter;
