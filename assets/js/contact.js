document.addEventListener('DOMContentLoaded', function() {
  const contactForm = document.getElementById('ajaxContactForm');
  if (!contactForm) return;

  contactForm.addEventListener('submit', async function(e) {
    e.preventDefault();
    const submitBtn = document.getElementById('submitBtn');
    const successMsg = document.getElementById('formSuccessMessage');
    
    // Change button state to indicate loading
    const originalBtnText = submitBtn.innerHTML;
    submitBtn.innerHTML = 'Transmitting...';
    submitBtn.disabled = true;

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
        successMsg.style.display = 'block';
        contactForm.reset();
      } else {
        alert('There was a problem sending your message. Please email us directly at contact@swiftwebsync.com');
        submitBtn.innerHTML = originalBtnText;
        submitBtn.disabled = false;
      }
    } catch (error) {
      alert('Network error. Please check your connection or email us directly.');
      submitBtn.innerHTML = originalBtnText;
      submitBtn.disabled = false;
    }
  });
});