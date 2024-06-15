import React, { useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  DatePicker,
  Textarea,
} from "@nextui-org/react";
import { getApplyLeaveData } from "../data/employeeData";
import { formatDate } from "../utils/dateFormator";

const NewLeaveForm = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [leaveReason, setLeaveReason] = useState("");
  const [leaveDate, setLeaveDate] = useState();

  const handleLeaveApplication = async () => {
    const leaveData = {
      leaveDate: formatDate(leaveDate),
      leaveReason: leaveReason,
    };

    const response = await getApplyLeaveData(leaveData);
    console.log(response);
    if (response.success) {
      alert("Leave Application Sent");
    } else {
      alert("Leave application failed");
    }
    onOpenChange();
  };

  return (
    <>
      <Button color="success" onPress={onOpen}>
        New Leave
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Leave Application
              </ModalHeader>
              <ModalBody>
                <DatePicker
                  showMonthAndYearPickers
                  isRequired
                  label="Leave date"
                  className=""
                  variant="underlined"
                  value={leaveDate}
                  onChange={setLeaveDate}
                />
                <Textarea
                  isRequired
                  variant="underlined"
                  label="Reason"
                  placeholder="Enter employee address"
                  value={leaveReason}
                  onValueChange={setLeaveReason}
                />
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Cancel
                </Button>
                <Button color="primary" onPress={handleLeaveApplication}>
                  Apply
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default NewLeaveForm;
