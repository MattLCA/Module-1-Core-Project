document.addEventListener("DOMContentLoaded", () => {
  const leaveSearch = document.getElementById("leaveSearch");
  const leaveDepartment = document.getElementById("leaveDepartment");
  const leaveType = document.getElementById("leaveType");
  const leaveCount = document.getElementById("leaveCount");
  const leaveRows = document.getElementById("leaveRows");

  const storedLeaveData = localStorage.getItem("bs_leave_data");
  let leaveRequests = storedLeaveData
    ? JSON.parse(storedLeaveData)
    : [
        {
          employee: "Alex Turner",
          empId: "EMP-023",
          department: "Engineering",
          leaveType: "Annual Leave",
          startDate: "Jul 01",
          endDate: "Jul 05",
          duration: "5 days",
          reason: "Family vacation...",
          submitted: "Jun 20",
          manager: "Mark Thompson",
          status: "Pending",
        },
        {
          employee: "Zara Ahmed",
          empId: "EMP-047",
          department: "Sales",
          leaveType: "Sick Leave",
          startDate: "Jun 27",
          endDate: "Jun 28",
          duration: "2 days",
          reason: "Medical appointment",
          submitted: "Jun 25",
          manager: "James Wilson",
          status: "Pending",
        },
        {
          employee: "Michael Brown",
          empId: "EMP-031",
          department: "Finance",
          leaveType: "Casual Leave",
          startDate: "Jun 30",
          endDate: "Jun 30",
          duration: "1 day",
          reason: "Personal errands",
          submitted: "Jun 24",
          manager: "Sarah Mitchell",
          status: "Pending",
        },
        {
          employee: "Leila Nassar",
          empId: "EMP-055",
          department: "Marketing",
          leaveType: "Annual Leave",
          startDate: "Jul 07",
          endDate: "Jul 18",
          duration: "10 days",
          reason: "Annual holiday wit...",
          submitted: "Jun 22",
          manager: "Chris Johnson",
          status: "Pending",
        },
        {
          employee: "John Okafor",
          empId: "EMP-012",
          department: "Operations",
          leaveType: "Family Responsibility",
          startDate: "Jun 28",
          endDate: "Jun 30",
          duration: "3 days",
          reason: "Child care emergency",
          submitted: "Jun 25",
          manager: "Linda Chen",
          status: "Pending",
        },
        {
          employee: "Ananya Singh",
          empId: "EMP-038",
          department: "Human Resources",
          leaveType: "Annual Leave",
          startDate: "Jul 14",
          endDate: "Jul 25",
          duration: "10 days",
          reason: "Planned internation...",
          submitted: "Jun 23",
          manager: "Priya Sharma",
          status: "Pending",
        },
        {
          employee: "Ryan O'Brien",
          empId: "EMP-044",
          department: "IT",
          leaveType: "Sick Leave",
          startDate: "Jun 27",
          endDate: "Jun 27",
          duration: "1 day",
          reason: "Medical check-up",
          submitted: "Jun 25",
          manager: "Rachel Adams",
          status: "Pending",
        },
      ];

  function saveLeaveData() {
    localStorage.setItem("bs_leave_data", JSON.stringify(leaveRequests));
  }

  function formatBadgeType(type) {
    return type.replace(/\s+/g, " ").replace(/ /g, "\\ ");
  }

  const modalOverlay = document.getElementById("leaveModalOverlay");
  const modalTitle = document.getElementById("modalTitle");
  const modalSubtitle = document.getElementById("modalSubtitle");
  const modalRequestDetails = document.getElementById("modalRequestDetails");
  const modalTextareaLabel = document.getElementById("modalTextareaLabel");
  const modalReasonTextarea = document.getElementById("modalReasonTextarea");
  const modalCancelBtn = document.getElementById("modalCancelBtn");
  const modalCloseBtn = document.getElementById("modalCloseBtn");
  const modalConfirmBtn = document.getElementById("modalConfirmBtn");

  let activeLeaveRequestIndex = null;
  let activeAction = null;

  function openModal(index, action) {
    activeLeaveRequestIndex = index;
    activeAction = action;
    const request = leaveRequests[index];

    modalTitle.textContent =
      action === "approve" ? "Approve Leave Request" : "Decline Leave Request";
    modalSubtitle.textContent =
      action === "approve"
        ? "You are about to approve this leave request."
        : "Please provide a reason for declining this request.";

    modalRequestDetails.innerHTML = `
      <strong>${request.employee}</strong> (${request.empId})<br />
      ${request.department} • ${request.leaveType} • ${request.duration}<br />
      ${request.startDate} - ${request.endDate}<br />
      Submitted: ${request.submitted} • Manager:Busiswa Bala
    `;

    if (action === "approve") {
      modalTextareaLabel.style.display = "none";
      modalReasonTextarea.style.display = "none";
      modalReasonTextarea.value = "";
      modalConfirmBtn.textContent = "Approve";
    } else {
      modalTextareaLabel.style.display = "block";
      modalReasonTextarea.style.display = "block";
      modalReasonTextarea.value = "";
      modalConfirmBtn.textContent = "Decline";
      modalReasonTextarea.focus();
    }

    modalConfirmBtn.disabled = false;
    modalOverlay.classList.remove("hidden");
  }

  function closeModal() {
    modalOverlay.classList.add("hidden");
    activeLeaveRequestIndex = null;
    activeAction = null;
    modalReasonTextarea.value = "";
  }

  function handleModalConfirm() {
    if (activeLeaveRequestIndex === null) {
      return;
    }

    const request = leaveRequests[activeLeaveRequestIndex];

    if (activeAction === "approve") {
      request.status = "Approved";
      saveLeaveData();
      renderLeaveRows();
      closeModal();
      return;
    }

    const reason = modalReasonTextarea.value.trim();
    if (!reason) {
      modalReasonTextarea.focus();
      return;
    }

    request.status = "Declined";
    request.reason = reason;
    saveLeaveData();
    renderLeaveRows();
    closeModal();
  }

  function attachRowActions(row, request, index) {
    const approveBtn = row.querySelector(".approve");
    const declineBtn = row.querySelector(".decline");

    approveBtn.addEventListener("click", () => openModal(index, "approve"));
    declineBtn.addEventListener("click", () => openModal(index, "decline"));
  }

  function renderLeaveRows() {
    const filtered = leaveRequests.filter((request) => {
      const searchValue = leaveSearch.value.toLowerCase();
      const departmentValue = leaveDepartment.value;
      const typeValue = leaveType.value;

      const matchesSearch =
        request.employee.toLowerCase().includes(searchValue) ||
        request.empId.toLowerCase().includes(searchValue) ||
        request.department.toLowerCase().includes(searchValue);

      const matchesDepartment =
        departmentValue === "All Departments" ||
        request.department === departmentValue;

      const matchesType =
        typeValue === "All Types" || request.leaveType === typeValue;

      return matchesSearch && matchesDepartment && matchesType;
    });

    leaveCount.textContent = filtered.length;
    leaveRows.innerHTML = "";

    filtered.forEach((request) => {
      const index = leaveRequests.indexOf(request);
      const row = document.createElement("div");
      row.className = "leave-row";
      row.innerHTML = `
        <span>${request.employee}</span>
        <span>${request.empId}</span>
        <span>${request.department}</span>
        <span><span class="leave-badge ${formatBadgeType(request.leaveType)}">${request.leaveType}</span></span>
        <span>${request.startDate}</span>
        <span>${request.endDate}</span>
        <span>${request.duration}</span>
        <span>${request.reason}</span>
        <span>${request.submitted}</span>
        <span>Busiswa Bala</span>
        <span>${request.status}</span>
        <span class="leave-action">
          <button class="approve">Approve</button>
          <button class="decline">Decline</button>
        </span>
      `;

      leaveRows.appendChild(row);
      attachRowActions(row, request, index);
    });
  }

  leaveSearch.addEventListener("input", renderLeaveRows);
  leaveDepartment.addEventListener("change", renderLeaveRows);
  leaveType.addEventListener("change", renderLeaveRows);

  modalCancelBtn.addEventListener("click", closeModal);
  modalCloseBtn.addEventListener("click", closeModal);
  modalOverlay.addEventListener("click", (event) => {
    if (event.target === modalOverlay) {
      closeModal();
    }
  });
  modalConfirmBtn.addEventListener("click", handleModalConfirm);
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && !modalOverlay.classList.contains("hidden")) {
      closeModal();
    }
  });

  renderLeaveRows();
});
