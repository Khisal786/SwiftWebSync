// ==========================================
// SWIFT WEB SYNC - CONTACT FORM AJAX HANDLER
// ==========================================

document.addEventListener('DOMContentLoaded', function() {
  const contactForm = document.getElementById('ajaxContactForm');
  if (!contactForm) return;

  contactForm.addEventListener('submit', async function(e) {
    e.preventDefault();
    const submitBtn = document.getElementById('submitBtn');
    const successMsg = document.getElementById('formSuccessMessage');
    const errorMsg = document.getElementById('formErrorMessage');
    
    // Reset error display
    if (errorMsg) {
      errorMsg.style.display = 'none';
    }

    // Change button state to indicate loading
    const originalBtnText = submitBtn ? submitBtn.innerHTML : 'Get a Quote →';
    if (submitBtn) {
      submitBtn.innerHTML = 'Transmitting...';
      submitBtn.disabled = true;
    }

    try {
      const response = await fetch(contactForm.action, {
        method: 'POST',
        body: new FormData(contactForm),
        headers: {
          'Accept': 'application/json'
        }
      });

      if (response.ok) {
        // Hide form, clear inputs, show custom success message
        contactForm.style.display = 'none';
        if (successMsg) {
          successMsg.style.display = 'block';
        }
        contactForm.reset();
      } else {
        console.error('Contact form submission error:', response.status);
        if (errorMsg) {
          errorMsg.style.display = 'block';
        }
        if (submitBtn) {
          submitBtn.innerHTML = originalBtnText;
          submitBtn.disabled = false;
        }
      }
    } catch (error) {
      console.error('Contact form network error:', error);
      if (errorMsg) {
        errorMsg.style.display = 'block';
      }
      if (submitBtn) {
        submitBtn.innerHTML = originalBtnText;
        submitBtn.disabled = false;
      }
    }
  });
});
