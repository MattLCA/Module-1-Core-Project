document.addEventListener("DOMContentLoaded", () => {
  const timeoffSearch = document.getElementById("timeoffSearch");
  const timeoffDepartment = document.getElementById("timeoffDepartment");
  const timeoffType = document.getElementById("timeoffType");
  const employeeRows = document.getElementById("employeeRows");

  const timeoffData = [
    {
      id: "EMP-001",
      name: "Sarah Johnson",
      department: "Engineering",
      leaveType: "Annual Leave",
      startDate: "Jun 20",
      returnDate: "Jun 27",
      daysAway: "7d",
    },
    {
      id: "EMP-002",
      name: "Marcus Lee",
      department: "Operations",
      leaveType: "Sick Leave",
      startDate: "Jun 23",
      returnDate: "Jun 25",
      daysAway: "2d",
    },
    {
      id: "EMP-003",
      name: "Preethi Nair",
      department: "Sales",
      leaveType: "Casual Leave",
      startDate: "Jun 24",
      returnDate: "Jun 25",
      daysAway: "1d",
    },
    {
      id: "EMP-004",
      name: "David Chen",
      department: "Finance",
      leaveType: "Annual Leave",
      startDate: "Jun 15",
      returnDate: "Jul 02",
      daysAway: "8d",
    },
    {
      id: "EMP-005",
      name: "Amara Osei",
      department: "Human Resources",
      leaveType: "Family Responsibility",
      startDate: "Jun 22",
      returnDate: "Jun 26",
      daysAway: "1d",
    },
    {
      id: "EMP-006",
      name: "Thomas Wright",
      department: "IT",
      leaveType: "Annual Leave",
      startDate: "Jun 18",
      returnDate: "Jun 28",
      daysAway: "3d",
    },
    {
      id: "EMP-007",
      name: "Nina Patel",
      department: "Marketing",
      leaveType: "Sick Leave",
      startDate: "Jun 23",
      returnDate: "Jun 24",
      daysAway: "Returned Today",
    },
    {
      id: "EMP-008",
      name: "Carlos Rivera",
      department: "Customer Support",
      leaveType: "Casual Leave",
      startDate: "Jun 24",
      returnDate: "Jun 25",
      daysAway: "1d",
    },
  ];

  function getInitials(name) {
    return name
      .split(" ")
      .map((part) => part[0])
      .join("")
      .toUpperCase();
  }

  function leaveTypeClass(type) {
    return type.toLowerCase().replace(/\s+/g, "-");
  }

  function renderRows() {
    const searchValue = timeoffSearch.value.toLowerCase();
    const departmentValue = timeoffDepartment.value;
    const typeValue = timeoffType.value;

    const filtered = timeoffData.filter((item) => {
      const matchesSearch =
        item.id.toLowerCase().includes(searchValue) ||
        item.name.toLowerCase().includes(searchValue) ||
        item.department.toLowerCase().includes(searchValue) ||
        item.leaveType.toLowerCase().includes(searchValue);

      const matchesDepartment =
        departmentValue === "All Departments" ||
        item.department === departmentValue;

      const matchesType =
        typeValue === "All Types" || item.leaveType === typeValue;

      return matchesSearch && matchesDepartment && matchesType;
    });

    employeeRows.innerHTML = "";

    filtered.forEach((item) => {
      const row = document.createElement("div");
      row.className = "timeoff-row";
      row.innerHTML = `
        <span>${item.id}</span>
        <span class="emp-cell">
          <span class="emp-avatar">${getInitials(item.name)}</span>
          <span class="emp-name">${item.name}</span>
        </span>
        <span>${item.department}</span>
        <span><span class="status-pill ${leaveTypeClass(item.leaveType)}">${item.leaveType}</span></span>
        <span>${item.startDate}</span>
        <span>${item.returnDate}</span>
        <span>${item.daysAway}</span>
      `;
      employeeRows.appendChild(row);
    });
  }

  timeoffSearch.addEventListener("input", renderRows);
  timeoffDepartment.addEventListener("change", renderRows);
  timeoffType.addEventListener("change", renderRows);

  renderRows();
});
