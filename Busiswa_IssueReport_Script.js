document.addEventListener("DOMContentLoaded", () => {
  const reportForm = document.getElementById("issueReportForm");
  const issueCategory = document.getElementById("issueCategory");
  const issuePriority = document.getElementById("issuePriority");
  const issueDepartment = document.getElementById("issueDepartment");
  const issueSubject = document.getElementById("issueSubject");
  const issueDescription = document.getElementById("issueDescription");
  const submitAnonymous = document.getElementById("submitAnonymous");

  const underReviewCount = document.getElementById("underReviewCount");
  const inProgressCount = document.getElementById("inProgressCount");
  const resolvedCount = document.getElementById("resolvedCount");
  const submittedCount = document.getElementById("submittedCount");
  const reviewCount = document.getElementById("reviewCount");
  const inProgressSummary = document.getElementById("inProgressSummary");
  const resolvedSummary = document.getElementById("resolvedSummary");
  const donutPercent = document.getElementById("donutPercent");

  const underReviewList = document.getElementById("underReviewList");
  const inProgressList = document.getElementById("inProgressList");
  const resolvedList = document.getElementById("resolvedList");
  const timelineList = document.getElementById("timelineList");
  const activityRows = document.getElementById("activityRows");

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

  function createIssueCard(item) {
    const card = document.createElement("div");
    card.className = "issue-card";
    card.innerHTML = `
      <h4>${item.title}</h4>
      <div class="issue-meta">
        <span>${item.department}</span>
        <span class="priority-pill ${item.priority}">${item.priority}</span>
      </div>
      <p>${item.description}</p>
      <div class="issue-meta">
        <span>${item.reporter}</span>
        <span>${item.date}</span>
      </div>
    `;
    return card;
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

    underReviewCount.textContent = counts.review;
    inProgressCount.textContent = counts.inProgress;
    resolvedCount.textContent = counts.resolved;
    submittedCount.textContent = counts.submitted;
    reviewCount.textContent = counts.review;
    inProgressSummary.textContent = counts.inProgress;
    resolvedSummary.textContent = counts.resolved;

    donutPercent.textContent = `${getResolvedPercent()}%`;
    donutPercent.parentElement.style.background = `conic-gradient(#3ecf8e 0 ${getResolvedPercent()}%, #e7e7f4 ${getResolvedPercent()}% 100%)`;

    underReviewList.innerHTML = "";
    inProgressList.innerHTML = "";
    resolvedList.innerHTML = "";
    timelineList.innerHTML = "";

    issues.forEach((issue) => {
      const card = createIssueCard(issue);

      if (issue.status === "Under Review") {
        underReviewList.appendChild(card);
      } else if (issue.status === "In Progress") {
        inProgressList.appendChild(card);
      } else if (issue.status === "Resolved") {
        resolvedList.appendChild(card);
      }
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

    timelineItems.forEach((item) =>
      timelineList.appendChild(createTimelineItem(item)),
    );

    activityRows.innerHTML = "";
    issues.slice(0, 5).forEach((issue) => {
      activityRows.appendChild(createActivityRow(issue));
    });
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
