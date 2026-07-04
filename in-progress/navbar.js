console.log("navbar.js is connected");

document.addEventListener('DOMContentLoaded', () => {

  const sidebar = document.getElementById('sidebar');
  const sidebarToggle = document.getElementById('sidebarToggle');
  const userMenuBtn = document.getElementById('userMenuBtn');

  /* ---------- Mobile drawer open/close ---------- */
  if (sidebarToggle && sidebar) {
    sidebarToggle.addEventListener('click', () => {
      const isOpen = sidebar.classList.toggle('open');
      sidebarToggle.setAttribute('aria-expanded', String(isOpen));
    });

    // Close the drawer once a destination is chosen
    sidebar.querySelectorAll('.nav-item').forEach(link => {
      link.addEventListener('click', () => {
        sidebar.classList.remove('open');
        sidebarToggle.setAttribute('aria-expanded', 'false');
      });
    });

    // Close on Escape, return focus to the toggle button
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && sidebar.classList.contains('open')) {
        sidebar.classList.remove('open');
        sidebarToggle.setAttribute('aria-expanded', 'false');
        sidebarToggle.focus();
      }
    });
  }

  /* ---------- User menu button ---------- */
  if (userMenuBtn) {
    userMenuBtn.addEventListener('click', () => {
      const isExpanded = userMenuBtn.getAttribute('aria-expanded') === 'true';
      userMenuBtn.setAttribute('aria-expanded', String(!isExpanded));
      // TODO: wire this up to a real profile/settings/sign-out dropdown
      // once that menu exists — this just tracks open/closed state for now.
    });
  }

});