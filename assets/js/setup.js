document.addEventListener('DOMContentLoaded', function() {
  const businessTypeSelect = document.getElementById('businessType');
  const defaultInstruction = document.getElementById('defaultInstruction');
  const setupForm = document.getElementById('setupForm');

  if (!businessTypeSelect) return;

  // Handle industry section visibility toggles
  window.updateForm = function() {
    const type = businessTypeSelect.value;
    
    document.getElementById('restaurantSection').classList.remove('active');
    document.getElementById('salonSection').classList.remove('active');
    document.getElementById('contractorSection').classList.remove('active');
    document.getElementById('fitnessSection').classList.remove('active');
    defaultInstruction.style.display = 'none';

    if (type === 'restaurant') {
      document.getElementById('restaurantSection').classList.add('active');
    } else if (type === 'salon') {
      document.getElementById('salonSection').classList.add('active');
    } else if (type === 'contractor') {
      document.getElementById('contractorSection').classList.add('active');
    } else if (type === 'fitness') {
      document.getElementById('fitnessSection').classList.add('active');
    } else {
      defaultInstruction.style.display = 'block';
    }
  };

  businessTypeSelect.addEventListener('change', window.updateForm);

  // Live color code updates
  const primaryColorInput = document.getElementById('primaryColor');
  const secondaryColorInput = document.getElementById('secondaryColor');

  if (primaryColorInput) {
    primaryColorInput.addEventListener('input', function() {
      document.getElementById('primaryColorCode').textContent = this.value;
    });
  }

  if (secondaryColorInput) {
    secondaryColorInput.addEventListener('input', function() {
      document.getElementById('secondaryColorCode').textContent = this.value;
    });
  }

  // Dynamic table row functions
  window.addMenuRow = function() {
    const tbody = document.getElementById('restaurantMenuBody');
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
    btn.closest('tr').remove();
  };

  // Asynchronous Form submission handler via Formspree API (Stays on page, compiles dynamic tables)
  if (setupForm) {
    setupForm.addEventListener('submit', function(e) {
      e.preventDefault();

      const submitBtn = document.getElementById('submitBtn');
      const originalBtnText = submitBtn.innerHTML;
      submitBtn.innerHTML = 'Submitting Details...';
      submitBtn.disabled = true;

      // 1. Gather dynamic table/catalog rows based on selected business type
      const businessType = document.getElementById('businessType').value;
      let catalogSummary = "=== DYNAMIC INDUSTRY CATALOG DATA ===\n";

      if (businessType === 'restaurant') {
        const rows = document.querySelectorAll('#restaurantMenuBody tr');
        rows.forEach((row, index) => {
          const name = row.querySelector('.menuItem')?.value;
          const price = row.querySelector('.menuPrice')?.value;
          const category = row.querySelector('.menuCategory')?.value;
          if (name) {
            catalogSummary += `[Item ${index + 1}] Name: ${name} | Price: $${price} | Category: ${category}\n`;
          }
        });
      } else if (businessType === 'salon') {
        const stylists = document.getElementById('stylists').value;
        catalogSummary += `Stylists/Specialists: ${stylists}\n`;
        const rows = document.querySelectorAll('#salonServicesBody tr');
        rows.forEach((row, index) => {
          const name = row.querySelector('.serviceName')?.value;
          const price = row.querySelector('.servicePrice')?.value;
          const duration = row.querySelector('.serviceDuration')?.value;
          if (name) {
            catalogSummary += `[Service ${index + 1}] Name: ${name} | Price: $${price} | Duration: ${duration} mins\n`;
          }
        });
      } else if (businessType === 'contractor') {
        const contractorServices = document.getElementById('contractorServices')?.value;
        const recentProjects = document.getElementById('recentProjects')?.value;
        catalogSummary += `Services Offered: ${contractorServices}\nRecent Projects: ${recentProjects}\n`;
      } else if (businessType === 'fitness') {
        const rows = document.querySelectorAll('#fitnessClassBody tr');
        rows.forEach((row, index) => {
          const name = row.querySelector('.className')?.value;
          const instructor = row.querySelector('.classInstructor')?.value;
          const time = row.querySelector('.classTime')?.value;
          if (name) {
            catalogSummary += `[Class ${index + 1}] Name: ${name} | Instructor: ${instructor} | Time: ${time}\n`;
          }
        });
      }

      // Inject compiled summary into our hidden field
      document.getElementById('customCatalogData').value = catalogSummary;

      // 2. Submit via Fetch API
      const formData = new FormData(setupForm);
      const formspreeEndpoint = 'https://formspree.io/f/mjykljrq';

      fetch(formspreeEndpoint, {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      })
      .then(response => {
        if (response.ok) {
          // Hide form, show success message smoothly
          setupForm.style.display = 'none';
          const successBox = document.getElementById('successMessage');
          successBox.style.display = 'block';
          successBox.classList.add('show');
          
          setupForm.reset();
        } else {
          alert('Oops! There was a problem submitting your form. Please try again.');
          submitBtn.innerHTML = originalBtnText;
          submitBtn.disabled = false;
        }
      })
      .catch(error => {
        alert('Network error. Please check your connection and try again.');
        submitBtn.innerHTML = originalBtnText;
        submitBtn.disabled = false;
      });
    });
  }
});