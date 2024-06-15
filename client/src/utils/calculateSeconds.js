export function calculateTotalSeconds(specificTimeStr) {
  try {
    // Parse the specific time string into a Date object
    const specificTime = new Date(`2024-06-13 ${specificTimeStr}`); // Replace with your actual date if needed

    // Get the current time
    const currentTime = new Date();

    // Calculate the difference in time
    const timeDelta = currentTime - specificTime;

    // Convert the timedelta to total seconds
    const totalSeconds = Math.floor(timeDelta / 1000); // Floor the result for whole seconds

    return totalSeconds;
  } catch (error) {
    console.error("Invalid time format. Please use HH:MM format.", error);
    return null; // Or return any other value to indicate an error
  }
}
