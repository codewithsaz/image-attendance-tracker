import { useState } from "react";
import { Input, Card, CardHeader, CardBody, Button } from "@nextui-org/react";
import { Icon } from "@iconify/react";
import { loginEmployeeData } from "../data/employeeData";
import { useNavigate } from "react-router-dom";
import useEmployeeStore from "../store/employeeStore";

const Login = () => {
  const [isVisible, setisVisible] = useState(false);

  const { setEmployee } = useEmployeeStore((state) => ({
    setEmployee: state.setEmployee,
  }));

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLoginEmployee = async () => {
    const employeeData = {
      email: email,
      password: password,
    };

    const data = await loginEmployeeData(employeeData);
    if (data.success) {
      setEmployee(data.employee);

      navigate("/dashboard", { replace: true });
    }
  };
  return (
    <div className="w-full h-svh flex justify-center items-center">
      <Card className="w-full max-w-sm">
        <CardHeader>Login Here</CardHeader>
        <CardBody className="flex flex-col gap-3">
          <Input
            isRequired
            type="email"
            label="Email"
            variant="bordered"
            placeholder="Enter your email"
            className=""
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <Input
            isRequired
            label="Password"
            variant="bordered"
            placeholder="Enter your password"
            endContent={
              <button
                className="focus:outline-none"
                type="button"
                onClick={() => {
                  setisVisible(!isVisible);
                }}
              >
                {isVisible ? (
                  <Icon icon="mdi:eye-off" />
                ) : (
                  <Icon icon="mdi:eye" />
                )}
              </button>
            }
            type={isVisible ? "text" : "password"}
            className=""
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <Button type="submit" onClick={handleLoginEmployee}>
            Login
          </Button>
        </CardBody>
      </Card>
    </div>
  );
};

export default Login;
