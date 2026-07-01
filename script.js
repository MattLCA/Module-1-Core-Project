// ---------- Data (swap this for a real API call later) ----------
const EMPLOYEES = [
  { id: "EMP-1001", name: "Nomvula Khumalo", role: "Senior Accountant", dept: "Finance",
    email: "nomvula.khumalo@company.co.za", phone: "071 234 5678", joined: "2021-03-14",
    status: "Active", basic: 32000, allowances: 4500, deductions: 6200 },
  { id: "EMP-1002", name: "Sipho Ndlovu", role: "Software Engineer", dept: "IT",
    email: "sipho.ndlovu@company.co.za", phone: "082 345 6789", joined: "2022-07-01",
    status: "Active", basic: 38000, allowances: 3000, deductions: 7100 },
  { id: "EMP-1003", name: "Aisha Patel", role: "HR Business Partner", dept: "Human Resources",
    email: "aisha.patel@company.co.za", phone: "079 456 7890", joined: "2020-01-20",
    status: "Active", basic: 29500, allowances: 2800, deductions: 5450 },
  { id: "EMP-1004", name: "Johan van der Merwe", role: "Operations Manager", dept: "Operations",
    email: "johan.vdm@company.co.za", phone: "083 567 8901", joined: "2019-11-05",
    status: "On Leave", basic: 41000, allowances: 5000, deductions: 8300 },
  { id: "EMP-1005", name: "Thandiwe Zulu", role: "Marketing Coordinator", dept: "Marketing",
    email: "thandiwe.zulu@company.co.za", phone: "072 678 9012", joined: "2023-02-27",
    status: "Active", basic: 24000, allowances: 2000, deductions: 4100 },
];

const fmtZAR = (n) => "R " + n.toLocaleString("en-ZA", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
const initials = (name) => name.split(" ").map(p => p[0]).join("").slice(0, 2);

// ---------- Navigation ----------
const navButtons = document.querySelectorAll(".nav-item");
const views = { home: document.getElementById("view-home"), payroll: document.getElementById("view-payroll") };

navButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    navButtons.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    Object.keys(views).forEach(key => {
      views[key].style.display = key === btn.dataset.view ? "block" : "none";
    });
  });
});

// ---------- Home: stats ----------
function renderStats() {
  const active = EMPLOYEES.filter(e => e.status === "Active").length;
  const depts = new Set(EMPLOYEES.map(e => e.dept)).size;
  const stats = [
    { icon: "👥", value: EMPLOYEES.length, label: "Total Employees" },
    { icon: "💼", value: active, label: "Active Today" },
    { icon: "🏢", value: depts, label: "Departments" },
  ];
  document.getElementById("stats").innerHTML = stats.map(s => `
    <div class="stat-card">
      <div class="stat-icon">${s.icon}</div>
      <div>
        <div class="stat-value">${s.value}</div>
        <div class="stat-label">${s.label}</div>
      </div>
    </div>`).join("");
}

// ---------- Home: employee directory ----------
function renderEmployeeList(filterText = "") {
  const filtered = EMPLOYEES.filter(e =>
    (e.name + e.role + e.dept).toLowerCase().includes(filterText.toLowerCase())
  );
  const list = document.getElementById("employee-list");
  if (filtered.length === 0) {
    list.innerHTML = `<p style="text-align:center; color:#8a8fa3; padding:24px 0; font-size:14px;">No employees match "${filterText}".</p>`;
    return;
  }
  list.innerHTML = filtered.map(e => `
    <div class="employee-row">
      <div class="avatar">${initials(e.name)}</div>
      <div class="employee-main">
        <div class="name">${e.name}</div>
        <div class="role">${e.role} · ${e.dept}</div>
      </div>
      <div class="employee-contact">
        <span>✉️ ${e.email}</span>
        <span>📞 ${e.phone}</span>
      </div>
      <span class="status-pill ${e.status === 'Active' ? 'status-active' : 'status-leave'}">${e.status}</span>
    </div>`).join("");
}

document.getElementById("search").addEventListener("input", (e) => {
  renderEmployeeList(e.target.value);
});

// ---------- Payroll table ----------
function renderPayroll() {
  const body = document.getElementById("payroll-body");
  body.innerHTML = EMPLOYEES.map(e => {
    const net = e.basic + e.allowances - e.deductions;
    return `
      <tr>
        <td>
          <div class="emp-name">${e.name}</div>
          <div class="emp-id">${e.id}</div>
        </td>
        <td>${fmtZAR(e.basic)}</td>
        <td>${fmtZAR(e.allowances)}</td>
        <td>- ${fmtZAR(e.deductions)}</td>
        <td class="net-pay">${fmtZAR(net)}</td>
        <td><button class="btn-generate" data-id="${e.id}">📄 Generate Payslip</button></td>
      </tr>`;
  }).join("");

  body.querySelectorAll(".btn-generate").forEach(btn => {
    btn.addEventListener("click", () => openPayslip(btn.dataset.id));
  });
}

// ---------- Payslip modal ----------
function openPayslip(id) {
  const e = EMPLOYEES.find(emp => emp.id === id);
  const gross = e.basic + e.allowances;
  const net = gross - e.deductions;

  document.getElementById("modal-body").innerHTML = `
    <div class="emp-info">
      <div>
        <div class="name">${e.name}</div>
        <div class="role">${e.role} · ${e.dept}</div>
      </div>
      <div class="id-label">Employee ID<br><span class="id-val">${e.id}</span></div>
    </div>
    <div class="payslip-table">
      <div class="payslip-section-header"><span>Earnings</span><span style="text-align:right">Amount</span></div>
      <div class="payslip-row"><span class="label">Basic Salary</span><span class="value">${fmtZAR(e.basic)}</span></div>
      <div class="payslip-row"><span class="label">Allowances</span><span class="value">${fmtZAR(e.allowances)}</span></div>
      <div class="payslip-section-header"><span>Deductions</span><span style="text-align:right">Amount</span></div>
      <div class="payslip-row"><span class="label">Tax, UIF & Other</span><span class="value">- ${fmtZAR(e.deductions)}</span></div>
    </div>
    <div class="net-pay-box">
      <span class="label">Net Pay</span>
      <span class="value">${fmtZAR(net)}</span>
    </div>
    <button class="btn-print" onclick="window.print()">🖨️ Print / Save as PDF</button>
  `;
  document.getElementById("modal").classList.add("open");
}

document.getElementById("modal-close").addEventListener("click", () => {
  document.getElementById("modal").classList.remove("open");
});
document.getElementById("modal").addEventListener("click", (e) => {
  if (e.target.id === "modal") document.getElementById("modal").classList.remove("open");
});

// ---------- Init ----------
renderStats();
renderEmployeeList();
renderPayroll();
