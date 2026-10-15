// ==========================================
// SWIFT WEB SYNC - SETUP FORM & DYNAMIC BUILDER
// ==========================================

document.addEventListener('DOMContentLoaded', function() {
  const businessTypeSelect = document.getElementById('businessType');
  const defaultInstruction = document.getElementById('defaultInstruction');
  const setupForm = document.getElementById('setupForm');

  if (!businessTypeSelect) return;

  // Handle industry section visibility toggles
  window.updateForm = function() {
    const type = businessTypeSelect.value;
    
    const restSec = document.getElementById('restaurantSection');
    const salonSec = document.getElementById('salonSection');
    const contSec = document.getElementById('contractorSection');
    const fitSec = document.getElementById('fitnessSection');

    if (restSec) restSec.classList.remove('active');
    if (salonSec) salonSec.classList.remove('active');
    if (contSec) contSec.classList.remove('active');
    if (fitSec) fitSec.classList.remove('active');
    if (defaultInstruction) defaultInstruction.style.display = 'none';

    if (type === 'restaurant' && restSec) {
      restSec.classList.add('active');
    } else if (type === 'salon' && salonSec) {
      salonSec.classList.add('active');
    } else if (type === 'contractor' && contSec) {
      contSec.classList.add('active');
    } else if (type === 'fitness' && fitSec) {
      fitSec.classList.add('active');
    } else {
      if (defaultInstruction) defaultInstruction.style.display = 'block';
    }
  };

  businessTypeSelect.addEventListener('change', window.updateForm);

  // Live color code updates
  const primaryColorInput = document.getElementById('primaryColor');
  const secondaryColorInput = document.getElementById('secondaryColor');

  if (primaryColorInput) {
    primaryColorInput.addEventListener('input', function() {
      const codeEl = document.getElementById('primaryColorCode');
      if (codeEl) codeEl.textContent = this.value;
    });
  }

  if (secondaryColorInput) {
    secondaryColorInput.addEventListener('input', function() {
      const codeEl = document.getElementById('secondaryColorCode');
      if (codeEl) codeEl.textContent = this.value;
    });
  }

  // Dynamic table row functions
  window.addMenuRow = function() {
    const tbody = document.getElementById('restaurantMenuBody');
    if (!tbody) return;
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td><input type="text" placeholder="Item name" class="menuItem"></td>
      <td><input type="number" placeholder="0.00" step="0.01" class="menuPrice"></td>
      <td><input type="text" placeholder="Category" class="menuCategory"></td>
      <td style="text-align: center;"><button type="button" class="setup-remove-btn" onclick="removeRow(this)">X</button></td>
    `;
    tbody.appendChild(tr);
  };

  window.addServiceRow = function() {
    const tbody = document.getElementById('salonServicesBody');
    if (!tbody) return;
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td><input type="text" placeholder="Service name" class="serviceName"></td>
      <td><input type="number" placeholder="0" step="1" class="servicePrice"></td>
      <td><input type="number" placeholder="45" step="1" class="serviceDuration"></td>
      <td style="text-align: center;"><button type="button" class="setup-remove-btn" onclick="removeRow(this)">X</button></td>
    `;
    tbody.appendChild(tr);
  };

  window.addClassRow = function() {
    const tbody = document.getElementById('fitnessClassBody');
    if (!tbody) return;
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td><input type="text" placeholder="Class name" class="className"></td>
      <td><input type="text" placeholder="Instructor" class="classInstructor"></td>
      <td><input type="text" placeholder="Time" class="classTime"></td>
      <td style="text-align: center;"><button type="button" class="setup-remove-btn" onclick="removeRow(this)">X</button></td>
    `;
    tbody.appendChild(tr);
  };

  window.removeRow = function(btn) {
    if (btn && btn.closest('tr')) {
      btn.closest('tr').remove();
    }
  };

  // Asynchronous Form submission handler via Formspree API
  if (setupForm) {
    setupForm.addEventListener('submit', function(e) {
      e.preventDefault();

      const submitBtn = document.getElementById('submitBtn');
      const originalBtnText = submitBtn ? submitBtn.innerHTML : 'Submit';
      if (submitBtn) {
        submitBtn.innerHTML = 'Submitting Details...';
        submitBtn.disabled = true;
      }

      // 1. Gather dynamic table/catalog rows based on selected business type
      const businessType = document.getElementById('businessType')?.value || '';
      let catalogSummary = "=== DYNAMIC INDUSTRY CATALOG DATA ===\n";

      if (businessType === 'restaurant') {
        const rows = document.querySelectorAll('#restaurantMenuBody tr');
        rows.forEach((row, index) => {
          const name = row.querySelector('.menuItem')?.value?.trim();
          const price = row.querySelector('.menuPrice')?.value?.trim();
          const category = row.querySelector('.menuCategory')?.value?.trim() || 'General';
          if (name) {
            const priceFormatted = price ? `$${price}` : 'N/A';
            catalogSummary += `[Item ${index + 1}] Name: ${name} | Price: ${priceFormatted} | Category: ${category}\n`;
          }
        });
      } else if (businessType === 'salon') {
        const stylists = document.getElementById('stylists')?.value || '';
        catalogSummary += `Stylists/Specialists: ${stylists}\n`;
        const rows = document.querySelectorAll('#salonServicesBody tr');
        rows.forEach((row, index) => {
          const name = row.querySelector('.serviceName')?.value?.trim();
          const price = row.querySelector('.servicePrice')?.value?.trim();
          const duration = row.querySelector('.serviceDuration')?.value?.trim();
          if (name) {
            const priceFormatted = price ? `$${price}` : 'N/A';
            const durationFormatted = duration ? `${duration} mins` : 'N/A';
            catalogSummary += `[Service ${index + 1}] Name: ${name} | Price: ${priceFormatted} | Duration: ${durationFormatted}\n`;
          }
        });
      } else if (businessType === 'contractor') {
        const contractorServices = document.getElementById('contractorServices')?.value || '';
        const recentProjects = document.getElementById('recentProjects')?.value || '';
        catalogSummary += `Services Offered: ${contractorServices}\nRecent Projects: ${recentProjects}\n`;
      } else if (businessType === 'fitness') {
        const rows = document.querySelectorAll('#fitnessClassBody tr');
        rows.forEach((row, index) => {
          const name = row.querySelector('.className')?.value?.trim();
          const instructor = row.querySelector('.classInstructor')?.value?.trim() || 'N/A';
          const time = row.querySelector('.classTime')?.value?.trim() || 'N/A';
          if (name) {
            catalogSummary += `[Class ${index + 1}] Name: ${name} | Instructor: ${instructor} | Time: ${time}\n`;
          }
        });
      }

      // Inject compiled summary into hidden field
      const catalogDataEl = document.getElementById('customCatalogData');
      if (catalogDataEl) catalogDataEl.value = catalogSummary;

      // 2. Submit via Fetch API reading action from form attribute
      const formData = new FormData(setupForm);
      const formspreeEndpoint = setupForm.action || 'https://formspree.io/f/mjykljrq';

      fetch(formspreeEndpoint, {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      })
      .then(response => {
        if (response.ok) {
          setupFileStyle = setupForm.style.display = 'none';
          const successBox = document.getElementById('successMessage');
          if (successBox) {
            successBox.style.display = 'block';
            successBox.classList.add('show');
          }
          setupForm.reset();
        } else {
          alert('Oops! There was a problem submitting your form. Please try again.');
          if (submitBtn) {
            submitBtn.innerHTML = originalBtnText;
            submitBtn.disabled = false;
          }
        }
      })
      .catch(error => {
        alert('Network error. Please check your connection and try again.');
        if (submitBtn) {
          submitBtn.innerHTML = originalBtnText;
          submitBtn.disabled = false;
        }
      });
    });
  }
});
