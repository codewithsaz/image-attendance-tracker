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
  console.log(time1, time2);
  function toMinutes(time) {
    const [timePart, modifier] = time.split(" ");
    let [hours, minutes, seconds] = timePart.split(":").map(Number);

    if (modifier === "PM" && hours !== 12) {
      hours += 12;
    }
    if (modifier === "AM" && hours === 12) {
      hours = 0;
    }

    return hours * 60 + minutes;
  }

  // Convert both times to minutes
  const minutes1 = toMinutes(time1);
  const minutes2 = toMinutes(time2);

  // Calculate the difference in minutes
  let difference = Math.abs(minutes2 - minutes1);

  // Convert the difference back to HH:mm format
  const hours = Math.floor(difference / 60);
  const minutes = difference % 60;

  // Format the result as HH:mm
  const result = `${String(hours).padStart(2, "0")}:${String(minutes).padStart(
    2,
    "0"
  )}`;

  console.log(result);

  return result;
}
