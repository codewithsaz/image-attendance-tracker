import { Card, CardBody, CardHeader } from "@nextui-org/react";
import { ContributionCalendar } from "react-contribution-calendar";

const EmployeeAttendanceGraph = () => {
  const data = [
    {
      "2024-04-20": { level: 2 },
    },
    {
      "2024-07-08": { level: 1 },
    },
    {
      "2024-07-09": { level: 4, data: {} },
    },
    {
      "2024-03-31": {
        level: 3,
        data: {
          myKey: "my data",
        },
      },
    },
  ];
  return (
    <Card className="w-full h-full min-h-96 flex p-2">
      <CardHeader className="w-full m-0 p-0 flex flex-col justify-center items-center">
        <h1 className="w-full font-bold text-2xl text-center">
          Yealry Attendance
        </h1>
        <p className="text-red-500 font-bold">
          {" "}
          This feature is not active at the moment
        </p>
      </CardHeader>

      <CardBody className="w-full flex   overflow-auto">
        <ContributionCalendar
          data={data}
          start="2024-01-01"
          end="2024-12-31"
          daysOfTheWeek={["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]}
          textColor="#1F2328"
          startsOnSunday={true}
          includeBoundary={true}
          theme="grass"
          cx={20}
          cy={20}
          cr={2}
          onCellClick={(e, data) => console.log(data)}
          scroll={false}
          // style={{ width: "100%" }}
        />
      </CardBody>
    </Card>
  );
};

export default EmployeeAttendanceGraph;
