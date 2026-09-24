// ==========================================
// SWIFT WEB SYNC - LIGHTWEIGHT MAIN JS
// ==========================================

document.addEventListener('DOMContentLoaded', () => {
  const menuToggle = document.getElementById('menuToggle');
  const siteNav = document.getElementById('siteNav');

  if (menuToggle && siteNav) {
    menuToggle.addEventListener('click', () => {
      siteNav.classList.toggle('active');
      menuToggle.classList.toggle('open');
    });

    // Close menu when clicking any nav link on mobile
    siteNav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        siteNav.classList.remove('active');
        menuToggle.classList.remove('open');
      });
    });
  }
});