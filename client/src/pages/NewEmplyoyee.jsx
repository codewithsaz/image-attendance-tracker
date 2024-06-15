import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Input,
  DatePicker,
  Textarea,
  TimeInput,
  Checkbox,
} from "@nextui-org/react";
import { addEmployee } from "../data/employeeData";
import { useState } from "react";
import { formatDate, formatTime } from "../utils/dateFormator";

const NewEmplyoyee = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [dateOfBirth, setdateOfBirth] = useState();
  const [joiningDate, setJoiningDate] = useState();
  const [designation, setDesignation] = useState("");
  const [address, setAddress] = useState("");
  const [shiftStartTime, setshiftStartTime] = useState();
  const [shiftEndTime, setshiftEndTime] = useState();
  const [totalLeaveAvailable, settotalLeaveAvailable] = useState();
  const [isAdmin, setIsAdmin] = useState(false);

  const handleCreateEmployee = async () => {
    const employeeData = {
      name: name,
      email: email,
      phone: phone,
      dateOfBirth: formatDate(dateOfBirth),
      designation: designation,
      joiningDate: formatDate(joiningDate),
      address: address,
      shiftStartTime: formatTime(shiftStartTime),
      shiftEndTime: formatTime(shiftEndTime),
      totalLeaveAvailable: totalLeaveAvailable,
      isAdmin: isAdmin,
    };

    const data = await addEmployee(employeeData);
    if (data.success) alert("Employee Added");
    else alert("Issue with adding new Employee");
  };
  return (
    <div className="w-full h-full flex flex-col p-2 lg:p-10">
      <Card className=" w-full max-w-screen-lg " shadow="none" radius="none">
        <CardHeader className=" font-bold text-2xl">
          Add new Employee
        </CardHeader>
        <CardBody className="flex flex-col gap-3">
          <Input
            isRequired
            type="text"
            label="Name"
            variant="underlined"
            placeholder="Enter employee name"
            className=""
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
          <Input
            isRequired
            type="email"
            label="Email"
            variant="underlined"
            placeholder="Enter employee email"
            className=""
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <Input
            isRequired
            type="tel"
            label="Phone"
            variant="underlined"
            placeholder="Enter employee phone"
            className=""
            onChange={(e) => {
              setPhone(e.target.value);
            }}
          />
          <DatePicker
            showMonthAndYearPickers
            isRequired
            label="Birth date"
            className=""
            variant="underlined"
            value={dateOfBirth}
            onChange={setdateOfBirth}
          />
          <Input
            isRequired
            type="text"
            label="Designation"
            variant="underlined"
            placeholder="Enter employee designation"
            className=""
            onChange={(e) => {
              setDesignation(e.target.value);
            }}
          />
          <DatePicker
            showMonthAndYearPickers
            isRequired
            label="Joining date"
            className=""
            variant="underlined"
            value={joiningDate}
            onChange={setJoiningDate}
          />
          <Textarea
            variant="underlined"
            label="Address"
            placeholder="Enter employee address"
            value={address}
            onValueChange={setAddress}
          />
          <div className="w-full flex gap-2">
            <TimeInput
              variant="underlined"
              isRequired
              label="Shift Start Time"
              value={shiftStartTime}
              onChange={setshiftStartTime}
            />
            <TimeInput
              variant="underlined"
              isRequired
              label="Shift End Time"
              value={shiftEndTime}
              onChange={setshiftEndTime}
            />
          </div>
          <Input
            isRequired
            type="number"
            label="Total Leaves"
            variant="underlined"
            placeholder="Eg: 22"
            className=""
            value={totalLeaveAvailable}
            onChange={(e) => {
              settotalLeaveAvailable(e.target.value);
            }}
          />
          <Checkbox
            color="primary"
            isSelected={isAdmin}
            onValueChange={setIsAdmin}
          >
            Is Admin?
          </Checkbox>
          <Button
            type="submit"
            className=" max-w-xs"
            onClick={handleCreateEmployee}
          >
            Create Employee
          </Button>
        </CardBody>
      </Card>
    </div>
  );
};

export default NewEmplyoyee;
