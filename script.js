// Function to add satellites
function addSatellites() {
  const satellites = [];
  for (let i = 0; i < 5; i++) {
    const satellite = document.createElement("div");
    satellite.classList.add("satellite");
    satellite.style.left = `${Math.random() * 100}%`;
    satellite.style.top = `${Math.random() * 100}%`;
    document.body.appendChild(satellite);
    satellites.push(satellite);
  }
  return satellites;
}

// Initialize satellites
const satellites = addSatellites();

// Function to reset satellites to random positions
function resetSatellitesPositions() {
  satellites.forEach((satellite) => {
    satellite.style.left = `${Math.random() * 100}%`;
    satellite.style.top = `${Math.random() * 100}%`;
  });
}

// Pause satellites when hovered over
document.body.addEventListener("mouseover", function (event) {
  satellites.forEach((satellite) => {
    satellite.style.animationPlayState = "paused";
  });
});

// Resume satellites when mouse leaves
document.body.addEventListener("mouseout", function (event) {
  satellites.forEach((satellite) => {
    satellite.style.animationPlayState = "running";
  });
});

// Reset satellites positions when page is loaded or refreshed
window.onload = resetSatellitesPositions;

// Optionally, reset satellites positions after a certain time interval
setInterval(resetSatellitesPositions, 5000); // Resets every 5 seconds

document
  .getElementById("countdownForm")
  .addEventListener("submit", function (e) {
    e.preventDefault(); // Prevent form from submitting normally

    // Get selected values from the form
    const selectedDate = document.getElementById("selectedDate").value;
    const selectedHours = parseInt(document.getElementById("hours").value);
    const selectedMinutes = parseInt(document.getElementById("minutes").value);
    const selectedAmpm = document.getElementById("ampm").value.toLowerCase();

    // Convert hours to 24-hour format
    let adjustedHour = selectedHours;
    if (selectedAmpm === "pm" && selectedHours !== 12) {
      adjustedHour += 12;
    } else if (selectedAmpm === "am" && selectedHours === 12) {
      adjustedHour = 0; // Set to 0 if 12 AM is chosen
    }

    // Combine date, time, and AM/PM into a full datetime string
    const dateTimeString = `${selectedDate}T${adjustedHour}:${selectedMinutes}:00`;

    // Parse the datetime string into a Date object using Moment.js
    const targetDateTime = moment(dateTimeString, "YYYY-MM-DDTHH:mm:ss");

    // Calculate the difference in milliseconds
    const diffInMilliseconds = targetDateTime.valueOf() - new Date().valueOf();

    // Initialize the countdown clock with the calculated difference, converted to seconds
    const clock = $(".clock").FlipClock(Math.abs(diffInMilliseconds) / 1000, {
      clockFace: "DailyCounter",
      countdown: true,
      autostart: true,
    });

    // Optional: Add callbacks for additional functionality
  });
