import React, { useEffect, useState } from "react";
import { useStopwatch } from "react-timer-hook";
import { calculateTotalSeconds } from "../utils/calculateSeconds";

const WorkTimer = ({ renderTimer, checkInTime }) => {
  const stopwatchOffset = new Date();
  const offsetSeconds = calculateTotalSeconds(checkInTime);
  stopwatchOffset.setSeconds(stopwatchOffset.getSeconds() + offsetSeconds);
  const { seconds, minutes, hours, isRunning } = useStopwatch({
    autoStart: renderTimer,
    offsetTimestamp: stopwatchOffset,
  });

  return (
    <div style={{ textAlign: "center" }}>
      <div className=" font-bold text-7xl">
        <span>{hours}</span>:<span>{minutes}</span>:<span>{seconds}</span>
      </div>
      <p>HH:MM:SS</p>
      <p>{isRunning ? "Working Hours" : "Not Working"}</p>
    </div>
  );
};

export default WorkTimer;
