document.addEventListener("DOMContentLoaded", () => {
  const clockTime = document.getElementById("clockTime");
  const clockDate = document.getElementById("clockDate");
  const clockLoc = document.getElementById("clockLoc");
  const clockBtn = document.getElementById("clockBtn");
  const statusText = document.getElementById("statusText");
  const statusDot = document.getElementById("statusDot");
  const activityRows = document.getElementById("activityRows");

  function pad(n) {
    return n < 10 ? "0" + n : n;
  }
  function formatTime(date) {
    let h = date.getHours();
    const m = pad(date.getMinutes());
    const ampm = h >= 12 ? "PM" : "AM";
    h = h % 12 || 12;
    return `${pad(h)}:${m} ${ampm}`;
  }

  function updateClock() {
    const now = new Date();
    clockTime.textContent = `${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}`;
    clockDate.textContent = now.toLocaleDateString(undefined, {
      weekday: "long",
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  }

  // initialize
  updateClock();
  setInterval(updateClock, 1000);

  // working state persisted
  let working = localStorage.getItem("bs_working");
  if (working === null) working = "true";
  working = working === "true";

  let lastClockIn = localStorage.getItem("bs_clockin_ts");
  if (lastClockIn) lastClockIn = parseInt(lastClockIn, 10);

  function applyState() {
    if (working) {
      clockBtn.textContent = "Clock Out";
      statusText.textContent = "Currently Working";
      statusDot.style.background = "#3ecf8e";
    } else {
      clockBtn.textContent = "Clock In";
      statusText.textContent = "Not Working";
      statusDot.style.background = "#e0e0e0";
    }
    localStorage.setItem("bs_working", working);
  }

  function minutesBetween(a, b) {
    return Math.round((b - a) / 60000);
  }

  function formatDuration(mins) {
    if (!mins || mins <= 0) return "—";
    const h = Math.floor(mins / 60);
    const m = mins % 60;
    return `${h}h ${m}m`;
  }

  function renderActivity() {
    activityRows.innerHTML = "";

    employeeData.employees.forEach((employee) => {
      const latestAttendance =
        employee.attendance[employee.attendance.length - 1];

      let clockIn = "09:00 AM";
      let clockOut = "05:00 PM";
      let hours = "8h";
      let statusClass = "present";

      if (latestAttendance.status === "Absent") {
        clockIn = "—";
        clockOut = "—";
        hours = "—";
        statusClass = "absent";
      } else if (latestAttendance.status === "Late") {
        statusClass = "late";
      }

      const initials = employee.name
        .split(" ")
        .map((word) => word[0])
        .join("");

      const row = document.createElement("tr");

      row.innerHTML = `
        <td>
          <div class="emp-cell">
            <div class="emp-avatar">${initials}</div>
            <div>
              <div class="emp-name">${employee.name}</div>
              <div class="emp-role">${employee.position}</div>
            </div>
          </div>
        </td>
        <td>${clockIn}</td>
        <td>${clockOut}</td>
        <td>${hours}</td>
        <td><span class="status-pill ${statusClass}">${latestAttendance.status}</span></td>
      `;

      activityRows.appendChild(row);
    });
  }

  // Add or update a row for the current user when toggling
  function addActivityEntryForToggle(isWorking) {
    const now = new Date();
    if (isWorking) {
      // clocking in
      lastClockIn = Date.now();
      localStorage.setItem("bs_clockin_ts", String(lastClockIn));
      // add a provisional row with only clock in
      activityData.unshift({
        badge: "BB",
        name: "You",
        in: formatTime(now),
        out: "—",
        hours: "—",
        status: "Present",
        statusClass: "badge-success",
      });
    } else {
      // clocking out
      const outTs = Date.now();
      if (lastClockIn) {
        const mins = minutesBetween(lastClockIn, outTs);
        const hours = formatDuration(mins);
        // replace the provisional row if it exists
        if (activityData[0] && activityData[0].name === "You") {
          activityData[0].out = formatTime(new Date(outTs));
          activityData[0].hours = hours;
          activityData[0].status = "Present";
          activityData[0].statusClass = "badge-success";
        } else {
          activityData.unshift({
            badge: "BB",
            name: "You",
            in: formatTime(new Date(lastClockIn)),
            out: formatTime(new Date(outTs)),
            hours,
            status: "Present",
            statusClass: "badge-success",
          });
        }
      } else {
        // no previous clock-in recorded — add a simple entry
        activityData.unshift({
          badge: "BB",
          name: "You",
          in: "—",
          out: formatTime(new Date(outTs)),
          hours: "—",
          status: "Present",
          statusClass: "badge-success",
        });
      }
      localStorage.removeItem("bs_clockin_ts");
      lastClockIn = null;
    }
    renderActivity();
  }

  // wire button
  clockBtn.addEventListener("click", () => {
    working = !working;
    if (working) {
      // clock in
      addActivityEntryForToggle(true);
    } else {
      // clock out
      addActivityEntryForToggle(false);
    }
    applyState();
  });

  // initial render
  applyState();
  renderActivity();
});
