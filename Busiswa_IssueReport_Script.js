document.addEventListener("DOMContentLoaded", () => {
  const reportForm = document.getElementById("issueReportForm");
  const issueCategory = document.getElementById("issueCategory");
  const issuePriority = document.getElementById("issuePriority");
  const issueDepartment = document.getElementById("issueDepartment");
  const issueSubject = document.getElementById("issueSubject");
  const issueDescription = document.getElementById("issueDescription");
  const submitAnonymous = document.getElementById("submitAnonymous");

  const submittedCount = document.getElementById("submittedCount");
  const reviewCount = document.getElementById("reviewCount");
  const inProgressSummary = document.getElementById("inProgressSummary");
  const resolvedSummary = document.getElementById("resolvedSummary");
  const donutPercent = document.getElementById("donutPercent");

  const reportsTableBody = document.getElementById("reportsTableBody");
  const timelineList = document.getElementById("timelineList");

  const storedData = localStorage.getItem("bs_issues_data");
  let issues = storedData ? JSON.parse(storedData) : [];

  const statusMap = {
    review: "Under Review",
    inProgress: "In Progress",
    resolved: "Resolved",
  };

  function saveIssues() {
    localStorage.setItem("bs_issues_data", JSON.stringify(issues));
  }

  function getStatusCounts() {
    return {
      submitted: issues.length,
      review: issues.filter((item) => item.status === "Under Review").length,
      inProgress: issues.filter((item) => item.status === "In Progress").length,
      resolved: issues.filter((item) => item.status === "Resolved").length,
    };
  }

  function getResolvedPercent() {
    const totals = getStatusCounts();
    if (!totals.submitted) return 0;
    return Math.round((totals.resolved / totals.submitted) * 100);
  }

  function getStatusBadgeClass(status) {
    if (status === "Under Review") return "review";
    if (status === "In Progress") return "progress";
    return "resolved";
  }

  function createTimelineItem(item) {
    const row = document.createElement("div");
    row.className = "timeline-item";
    row.innerHTML = `
      <div class="timeline-step">
        <span class="timeline-dot ${item.dot}"></span>
        <div class="timeline-title">${item.event}</div>
        <div class="timeline-time">${item.time}</div>
        <div class="timeline-detail">${item.detail}</div>
      </div>
    `;
    return row;
  }

  function renderDashboard() {
    const counts = getStatusCounts();

    submittedCount.textContent = counts.submitted;
    reviewCount.textContent = counts.review;
    inProgressSummary.textContent = counts.inProgress;
    resolvedSummary.textContent = counts.resolved;

    donutPercent.textContent = `${getResolvedPercent()}%`;
    donutPercent.parentElement.style.background = `conic-gradient(#3ecf8e 0 ${getResolvedPercent()}%, #e7e7f4 ${getResolvedPercent()}% 100%)`;

    // Populate reports table
    reportsTableBody.innerHTML = "";
    issues.forEach((issue) => {
      const row = document.createElement("tr");
      const statusBadgeClass = getStatusBadgeClass(issue.status);
      row.innerHTML = `
        <td>${issue.reference}</td>
        <td>${issue.title}</td>
        <td>${issue.category}</td>
        <td>${issue.department}</td>
        <td><span class="priority-badge ${issue.priority}">${issue.priority}</span></td>
        <td><span class="status-badge ${statusBadgeClass}">${issue.status}</span></td>
        <td>${issue.submittedAt}</td>
      `;
      reportsTableBody.appendChild(row);
    });

    const timelineItems = [...issues]
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      .slice(0, 5)
      .map((issue) => ({
        event: issue.title,
        time: issue.submittedAt,
        detail: `${issue.priority} priority · ${issue.department}`,
        status: issue.status,
        dot:
          issue.status === "Resolved"
            ? "resolved"
            : issue.status === "In Progress"
              ? "progress"
              : "review",
      }));

    timelineList.innerHTML = "";
    timelineItems.forEach((item) =>
      timelineList.appendChild(createTimelineItem(item)),
    );
  }

  function createActivityRow(issue) {
    const row = document.createElement("div");
    row.className = "activity-row";
    row.innerHTML = `
      <span>${issue.reference}</span>
      <span>${issue.category}</span>
      <span>${issue.priority}</span>
      <span>${issue.status}</span>
      <span>${issue.submittedAt}</span>
    `;
    return row;
  }

  function createIssueReference() {
    const prefix = "HR";
    const number = String(41 + issues.length).padStart(3, "0");
    return `${prefix}-${number}`;
  }

  function getStatusFromPriority(priority) {
    if (priority === "Critical" || priority === "High") return "Under Review";
    if (priority === "Medium") return "In Progress";
    return "Resolved";
  }

  reportForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const newIssue = {
      reference: createIssueReference(),
      title: issueSubject.value.trim() || "Issue report",
      description: issueDescription.value.trim() || "No description provided.",
      category: issueCategory.value,
      priority: issuePriority.value,
      department: issueDepartment.value,
      reporter: submitAnonymous.checked ? "Anonymous" : "Priya Sharma",
      status: getStatusFromPriority(issuePriority.value),
      createdAt: new Date().toISOString(),
      submittedAt: new Date().toLocaleDateString(undefined, {
        month: "short",
        day: "numeric",
      }),
    };

    issues.unshift(newIssue);
    saveIssues();
    renderDashboard();

    reportForm.reset();
    issueCategory.value = "Workplace Safety";
    issuePriority.value = "Low";
    issueDepartment.value = "Engineering";
  });

  renderDashboard();
});
