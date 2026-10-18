// ==========================================
// SWIFT WEB SYNC - LIGHTWEIGHT MAIN JS
// ==========================================

document.addEventListener('DOMContentLoaded', () => {
  const menuToggle = document.getElementById('mobileMenuToggle');
  const siteNav = document.getElementById('siteNav');

  if (menuToggle && siteNav) {
    const toggleMenu = (shouldOpen) => {
      const isActive = typeof shouldOpen === 'boolean' 
        ? shouldOpen 
        : !siteNav.classList.contains('active');

      siteNav.classList.toggle('active', isActive);
      menuToggle.classList.toggle('active', isActive);
      menuToggle.setAttribute('aria-expanded', isActive ? 'true' : 'false');
    };

    // Toggle drawer on button click
    menuToggle.addEventListener('click', () => {
      toggleMenu();
    });

    // Close mobile menu when clicking any nav link
    siteNav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        toggleMenu(false);
      });
    });

    // Close menu when clicking outside the header/nav container
    document.addEventListener('click', (event) => {
      if (
        siteNav.classList.contains('active') &&
        !siteNav.contains(event.target) &&
        !menuToggle.contains(event.target)
      ) {
        toggleMenu(false);
      }
    });
  }
});
