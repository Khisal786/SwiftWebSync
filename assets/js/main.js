// ==========================================
// SWIFT WEB SYNC - LIGHTWEIGHT MAIN JS
// ==========================================

document.addEventListener('DOMContentLoaded', () => {
  // Updated selector ID from 'menuToggle' to 'mobileMenuToggle' to match header markup
  const menuToggle = document.getElementById('mobileMenuToggle');
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
