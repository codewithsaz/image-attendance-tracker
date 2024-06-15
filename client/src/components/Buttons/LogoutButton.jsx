import { Button } from "@nextui-org/react";
import { Link, useNavigate } from "react-router-dom";
import { logoutEmployee } from "../../services/apiService";
import useEmployeeStore from "../../store/employeeStore";

const LogoutButton = () => {
  const { setEmployee } = useEmployeeStore((state) => ({
    setEmployee: state.setEmployee,
  }));

  const navigate = useNavigate();

  const handleLogout = async () => {
    const response = await logoutEmployee();
    if (response.success) {
      setEmployee({});
      navigate("/", { replace: true });
    }
  };
  return (
    <Button
      as={Link}
      color="danger"
      href="#"
      variant="flat"
      onClick={handleLogout}
    >
      Logout
    </Button>
  );
};

export default LogoutButton;
