# Module 1 Core Project — ModernTech Worker Portal

A team-built HR Management System web application with two sides: an HR admin portal and an employee (worker) self-service portal.

## Getting Started

Open `login.html` first.

**Demo logins:**
| Role   | Email                  | Password  |
|--------|-------------------------|-----------|
| HR     | hr@moderntech.com       | hr123     |
| Worker | EMP001                  | employee123 |

## Team & Sections

| Section        | Contributors        |
|-----------------|----------------------|
| HR Section       | Matthew, Busiswa    |
| Employee Section | Angela, Mahir       |

### HR Section — Matthew & Busiswa

Admin-facing pages and logic for managing employees, payroll, attendance, leave, and issue reporting.

- `hr-dashboard.html`, `hr-dashboard.js`
- `hr-employees.html`, `hr-employees.js`, `hr-employee-data.js`
- `hr-payroll.html`, `hr-payroll.js`
- `hr-performance.html`, `hr-performance.js`
- `hr-storage.js`
- `Busiswa_Attendance.html`, `Busiswa_Attandance_Script.js`
- `Busiswa_Leave.html`, `Busiswa_Leave_Script.js`
- `Busiswa_TimeOff.html`, `Busiswa_TimeOff_Scipt.js`
- `Busiswa_IssuesReport.html`, `Busiswa_IssueReport_Script.js`
- `Busiswa_employee_data.js`
- `data/attendance.json`, `data/leave_data.json`, `data/payroll_data.json`, `data/employee_info.json`

### Employee Section — Angela & Mahir

Worker-facing self-service pages: dashboard, profile, leave, attendance and payslips.

- `worker-dashboard.html`
- `worker-profile.html`
- `worker-leave.html`
- `worker-attendance.html`
- `worker-payslip.html`
- `javascript/script.js`, `javascript/logout.js`, `javascript/worker-leave.js`, `javascript/worker-profile.js`
- `Css/worker-leave.css`, `Css/worker-profile.css`

## Shared Files

- `index.html`, `login.html`, `login.js`
- `style.css`, `styles1.css` — shared stylesheet used across HR and worker pages

## Features

- Clickable worker dashboard cards
- Attendance clock in/out saves to `localStorage`
- Leave request form saves to `localStorage`
- Payslip view with print and text-file download
- Toast confirmation messages
- Mobile-responsive sidebar toggle

## Notes

- `style.css` is the shared baseline stylesheet — please avoid editing others' classes directly; prefix new classes/IDs with your name to prevent conflicts (e.g. `matthew-`, `angela-`).
- Data is currently mocked via the JSON files in `data/` and browser `localStorage`; there is no backend/API yet.
