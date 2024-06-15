exports.formatDateTime = (date = new Date()) => {
  const time = date.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });

  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Months are 0-indexed
  const year = date.getFullYear().toString();

  return {
    time,
    date: {
      day: `${day}-${month}-${year}`,
      month,
      year,
    },
  };
};

exports.calculateTimeDifference = (time1, time2) => {
  try {
    // Use the current date
    const currentDate = new Date();

    // Parse the times into Date objects
    const timeFormat = "h:mm:ss a"; // Adjust format if needed (e.g., include seconds)
    const datetime1 = new Date(`${currentDate.toDateString()} ${time1}`);
    const datetime2 = new Date(`${currentDate.toDateString()} ${time2}`);

    // Extract hours, minutes, and adjust for AM/PM
    const hours1 =
      (datetime1.getHours() % 12) +
      (datetime1.getHours() === 12 ? 0 : datetime1.getHours() < 12 ? 12 : 0);
    const minutes1 = datetime1.getMinutes();
    const hours2 =
      (datetime2.getHours() % 12) +
      (datetime2.getHours() === 12 ? 0 : datetime2.getHours() < 12 ? 12 : 0);
    const minutes2 = datetime2.getMinutes();

    // Calculate the time difference in minutes
    const timeDiffInMinutes = hours2 * 60 + minutes2 - (hours1 * 60 + minutes1);

    // Handle negative time differences (time2 before time1)
    let timeDiff = timeDiffInMinutes;
    if (timeDiffInMinutes < 0) {
      timeDiff += 24 * 60; // Add 24 hours (1440 minutes) to account for crossing midnight
    }

    // Calculate hours, minutes, and format the output
    const hours = Math.floor(timeDiff / 60);
    const minutes = timeDiff % 60;
    console.log(
      `${hours.toString().padStart(2, "0")}:${minutes
        .toString()
        .padStart(2, "0")}`
    );
    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}`;
  } catch (error) {
    console.error("Invalid time format:", error);
    return "Invalid time format";
  }
};

exports.calculateTimeDifferenceWeight = (time1, time2) => {
  try {
    const timeFormat = "h:mm:ss a"; // Adjust format if needed (e.g., include seconds)

    // Parse the times into Date objects considering current date
    const currentDate = new Date();
    const datetime1 = new Date(`${currentDate.toDateString()} ${time1}`);
    const datetime2 = new Date(`${currentDate.toDateString()} ${time2}`);

    // Extract hours, minutes, and adjust for AM/PM
    const hours1 =
      (datetime1.getHours() % 12) +
      (datetime1.getHours() === 12 ? 0 : datetime1.getHours() < 12 ? 12 : 0);
    const minutes1 = datetime1.getMinutes();
    const hours2 =
      (datetime2.getHours() % 12) +
      (datetime2.getHours() === 12 ? 0 : datetime2.getHours() < 12 ? 12 : 0);
    const minutes2 = datetime2.getMinutes();

    // Calculate the time difference in minutes (consider crossing midnight)
    const timeDiffInMinutes = hours2 * 60 + minutes2 - (hours1 * 60 + minutes1);
    let timeDiff = timeDiffInMinutes;
    if (timeDiffInMinutes < 0) {
      timeDiff += 24 * 60; // Add 24 hours (1440 minutes) to account for crossing midnight
    }

    const timeDiffHours = timeDiff / 60;
    let weight;
    if (timeDiffHours >= 8) {
      weight = 1;
    } else if (timeDiffHours <= 0) {
      weight = 0;
    } else {
      weight = 0.5;
    }
    return weight;
  } catch (error) {
    console.error("Invalid time format:", error);
    return "Invalid time format";
  }
};
