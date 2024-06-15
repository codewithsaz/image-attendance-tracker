export function formatDate(dateObject) {
  const day = String(dateObject.day).padStart(2, "0"); // Pad day with leading zero
  const month = String(dateObject.month).padStart(2, "0"); // Pad month with leading zero
  const year = dateObject.year;
  return `${day}-${month}-${year}`;
}

export function formatTime(timeObject) {
  const hour = timeObject.hour % 12 || 12; // Convert to 12-hour format (handle midnight)
  const minutes = String(timeObject.minute).padStart(2, "0"); // Pad minutes with leading zero
  const period = timeObject.hour < 12 ? "AM" : "PM";
  return `${hour}:${minutes} ${period}`;
}

export function formatTimeToHoursMinutes(timeString) {
  const [timeHourString, period] = timeString.split(" ");
  const [hours, minutes] = timeHourString.split(":"); // Split on spaces

  if (period === "PM" && hours !== 12) {
    // Handle PM cases except noon (12:00 PM)
    return `${Number(hours) + 12}:${minutes}`; // No padding for minutes
  } else {
    return `${hours}:${minutes}`; // No padding for hours or minutes
  }
}

export function calculateTimeDifference(time1, time2) {
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
}
