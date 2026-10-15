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
    
    // Change button state to indicate loading
    const originalBtnText = submitBtn ? submitBtn.innerHTML : 'Send';
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
        alert('There was a problem sending your message. Please email us directly at contact@swiftwebsync.com');
        if (submitBtn) {
          submitBtn.innerHTML = originalBtnText;
          submitBtn.disabled = false;
        }
      }
    } catch (error) {
      alert('Network error. Please check your connection or email us directly.');
      if (submitBtn) {
        submitBtn.innerHTML = originalBtnText;
        submitBtn.disabled = false;
      }
    }
  });
});
