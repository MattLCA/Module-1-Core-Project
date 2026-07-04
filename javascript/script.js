document.addEventListener("DOMContentLoaded", () => {
  // Current page
  let currentPage = window.location.pathname.split("/").pop();

  if (currentPage === "") {
    currentPage = "index.html";
  }

  // Everything for each page
  const pages = {
    "index.html": {
      nav: "nav-dashboard",
      title: "Dashboard",
      subtitle: "Welcome back to the ModernTech Employee Portal.",
    },

    "attendance.html": {
      nav: "nav-attendance",
      title: "Attendance",
      subtitle: "View your attendance records and working hours.",
    },

    "leave.html": {
      nav: "nav-leave",
      title: "Leave Requests",
      subtitle: "Submit and track your leave requests.",
    },

    "payroll.html": {
      nav: "nav-payroll",
      title: "Payroll",
      subtitle: "View your payroll information and earnings.",
    },

    "employee-information.html": {
      nav: "nav-information",
      title: "My Information",
      subtitle: "View and update your employment information.",
    },

    "notifications.html": {
      nav: "nav-notifications",
      title: "Notifications",
      subtitle: "Stay informed about important updates.",
    },

    "profile.html": {
      nav: "nav-profile",
      title: "My Profile",
      subtitle: "Manage your account information.",
    },

    "settings.html": {
      nav: "nav-settings",
      title: "Settings",
      subtitle: "Customize your application preferences.",
    },
  };

  const page = pages[currentPage];

  if (!page) return;

  // Active sidebar item
  document.getElementById(page.nav)?.classList.add("active");

  // Heading
  const title = document.getElementById("page-title");
  const subtitle = document.getElementById("page-subtitle");

  if (title) {
    title.textContent = page.title;
  }

  if (subtitle) {
    subtitle.textContent = page.subtitle;
  }
});
