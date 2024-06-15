import React, { useState, useEffect } from "react";
import {
  getAllPendingLeaveData,
  getApproveLeaveData,
  getRejectLeaveData,
} from "../data/employeeData";
import { Button, Card, CardBody, CardFooter } from "@nextui-org/react";
import OldLeaveRequestTable from "../components/OldLeaveRequestTable";

const LeaveRequest = () => {
  const [allPendingLeaveRequest, setallPendingLeaveRequest] = useState([]);
  const [reload, setreload] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      const response = await getAllPendingLeaveData();

      if (response.success) setallPendingLeaveRequest(response.leaves);
    };
    fetchData();
    return () => {};
  }, [reload]);

  const handleApproval = async (leaveID) => {
    const leaveData = { leaveID: leaveID };
    const response = await getApproveLeaveData(leaveData);
    if (response.success) {
      console.log(leaveID);
      alert("Leave Approved");
      setreload((prev) => !prev);
    }
  };

  const handleRejection = async (leaveID) => {
    const leaveData = { leaveID: leaveID };

    const response = await getRejectLeaveData(leaveData);
    if (response.success) {
      console.log(leaveID);
      alert("Leave Rejected");
      setreload((prev) => !prev);
    }
  };

  return (
    <div className="w-full p-2">
      <div className="p-2">
        <h1 className="font-bold text-2xl">New Leave Request</h1>
        <ul className="w-full flex flex-wrap gap-2">
          <>
            {allPendingLeaveRequest.length > 0 ? (
              allPendingLeaveRequest.map((leave) => (
                <Card key={leave._id} className="w-full max-w-xs">
                  <CardBody className="flex flex-col gap-2">
                    <p>
                      Name: <span className="font-semibold">{leave.name}</span>
                    </p>
                    <p>
                      EmpID:{" "}
                      <span className="font-semibold">{leave.employeeID}</span>
                    </p>
                    <p>
                      Date: <span className="font-semibold">{leave.date}</span>
                    </p>
                    <p>
                      Reason:{" "}
                      <span className="font-semibold">{leave.reason}</span>
                    </p>
                  </CardBody>
                  <CardFooter className="w-full flex gap-2 justify-center">
                    <Button
                      color="danger"
                      className="w-full"
                      onClick={() => {
                        handleRejection(leave._id);
                      }}
                    >
                      Reject
                    </Button>
                    <Button
                      color="success"
                      className="w-full"
                      onClick={() => {
                        handleApproval(leave._id);
                      }}
                    >
                      Approve
                    </Button>
                  </CardFooter>
                </Card>
              ))
            ) : (
              <p>No new request</p>
            )}
          </>
        </ul>
      </div>
      <div className="w-full">
        <OldLeaveRequestTable />
      </div>
    </div>
  );
};

export default LeaveRequest;
