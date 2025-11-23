/**
 * CARPETAS LED - Form Handling
 * Client-side validation and submission for contact and quote forms
 */

// ========================================
// Quote Form Handler
// ========================================

/**
 * Initialize quote form with simulator data if available
 */
function initQuoteForm() {
    const simulatorData = localStorage.getItem('simulatorData');
    const selectedProduct = localStorage.getItem('selectedProduct');

    if (simulatorData) {
        const data = JSON.parse(simulatorData);

        // Populate form fields
        if (document.getElementById('quote-showcase-width')) {
            document.getElementById('quote-showcase-width').value = data.showcaseWidth;
        }
        if (document.getElementById('quote-showcase-height')) {
            document.getElementById('quote-showcase-height').value = data.showcaseHeight;
        }
        if (document.getElementById('quote-quantity')) {
            document.getElementById('quote-quantity').value = data.quantity;
        }

        // Set product selector
        const productSelector = document.getElementById('quote-product-selector');
        if (productSelector) {
            productSelector.value = data.productId;
        }

        // Show info message
        const infoBox = document.createElement('div');
        infoBox.className = 'form-success';
        infoBox.innerHTML = `
      <strong>Configuración del simulador cargada:</strong><br>
      Escaparate: ${data.showcaseWidth}cm x ${data.showcaseHeight}cm<br>
      Modelo: ${data.productName}<br>
      Cantidad estimada: ${data.quantity} carpetas (${data.framesHorizontal} horizontal x ${data.framesVertical} vertical)
    `;

        const form = document.getElementById('quote-form');
        if (form) {
            form.insertBefore(infoBox, form.firstChild);
        }

        // Clear simulator data from localStorage
        localStorage.removeItem('simulatorData');
    } else if (selectedProduct) {
        const data = JSON.parse(selectedProduct);

        // Set product selector
        const productSelector = document.getElementById('quote-product-selector');
        if (productSelector) {
            productSelector.value = data.id;
        }

        // Clear selected product from localStorage
        localStorage.removeItem('selectedProduct');
    }
}

/**
 * Validate quote form
 */
function validateQuoteForm(formData) {
    const errors = [];

    // Required fields
    if (!formData.get('company')) {
        errors.push('El nombre de la empresa es obligatorio');
    }

    if (!formData.get('contact')) {
        errors.push('El nombre de contacto es obligatorio');
    }

    // Email validation
    const email = formData.get('email');
    if (!email) {
        errors.push('El email es obligatorio');
    } else if (!window.carpetasLED.validateEmail(email)) {
        errors.push('El email no es válido');
    }

    // Phone validation
    const phone = formData.get('phone');
    if (!phone) {
        errors.push('El teléfono es obligatorio');
    } else if (!window.carpetasLED.validatePhone(phone)) {
        errors.push('El teléfono no es válido');
    }

    if (!formData.get('location')) {
        errors.push('La localidad/provincia es obligatoria');
    }

    if (!formData.get('product')) {
        errors.push('Debes seleccionar un modelo');
    }

    // RGPD checkbox
    if (!formData.get('rgpd')) {
        errors.push('Debes aceptar la política de privacidad');
    }

    return errors;
}

/**
 * Handle quote form submission
 */
function handleQuoteFormSubmit(event) {
    event.preventDefault();

    const form = event.target;
    const formData = new FormData(form);

    // Validate form
    const errors = validateQuoteForm(formData);

    if (errors.length > 0) {
        alert('Por favor, corrige los siguientes errores:\n\n' + errors.join('\n'));
        return;
    }

    // Prepare data for submission
    const data = {
        company: formData.get('company'),
        contact: formData.get('contact'),
        email: formData.get('email'),
        phone: formData.get('phone'),
        location: formData.get('location'),
        businessType: formData.get('business-type'),
        showcaseWidth: formData.get('showcase-width'),
        showcaseHeight: formData.get('showcase-height'),
        product: formData.get('product'),
        quantity: formData.get('quantity'),
        message: formData.get('message')
    };

    // TODO: Replace with actual backend endpoint
    // Example: fetch('/api/quote', { method: 'POST', body: JSON.stringify(data) })

    console.log('Quote form data:', data);

    // Simulate submission
    submitFormData(form, data, 'quote');
}

/**
 * Handle contact form submission
 */
function handleContactFormSubmit(event) {
    event.preventDefault();

    const form = event.target;
    const formData = new FormData(form);

    // Basic validation
    const name = formData.get('name');
    const email = formData.get('email');
    const message = formData.get('message');

    if (!name || !email || !message) {
        alert('Por favor, completa todos los campos obligatorios');
        return;
    }

    if (!window.carpetasLED.validateEmail(email)) {
        alert('Por favor, introduce un email válido');
        return;
    }

    const data = { name, email, message };

    // TODO: Replace with actual backend endpoint
    console.log('Contact form data:', data);

    // Simulate submission
    submitFormData(form, data, 'contact');
}

/**
 * Simulate form submission (replace with actual backend call)
 */
function submitFormData(form, data, formType) {
    // Show loading state
    const submitButton = form.querySelector('button[type="submit"]');
    const originalText = submitButton.textContent;
    submitButton.disabled = true;
    submitButton.textContent = 'Enviando...';

    // Simulate API call
    setTimeout(() => {
        // Hide form
        form.style.display = 'none';

        // Show success message
        const successMessage = document.createElement('div');
        successMessage.className = 'form-success';
        successMessage.style.padding = '2rem';
        successMessage.style.textAlign = 'center';
        successMessage.innerHTML = `
      <h3 style="color: var(--color-success); margin-bottom: 1rem;">✓ ¡Mensaje enviado correctamente!</h3>
      <p>Gracias por tu interés. Te contactaremos en menos de 24 horas.</p>
      ${formType === 'quote' ? '<p>Recibirás un presupuesto personalizado adaptado a tus necesidades.</p>' : ''}
      <button class="btn btn-primary mt-3" onclick="location.href='index.html'">Volver al inicio</button>
    `;

        form.parentNode.insertBefore(successMessage, form);

        // Reset button state
        submitButton.disabled = false;
        submitButton.textContent = originalText;

        // Reset form
        form.reset();

        // TODO: Actual implementation would be:
        /*
        fetch('/api/send-email', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then(result => {
          // Show success message
        })
        .catch(error => {
          // Show error message
          alert('Ha ocurrido un error. Por favor, inténtalo de nuevo o contacta por teléfono.');
          submitButton.disabled = false;
          submitButton.textContent = originalText;
        });
        */
    }, 1500);
}

// ========================================
// Real-time validation
// ========================================
function setupRealtimeValidation() {
    // Email fields
    const emailInputs = document.querySelectorAll('input[type="email"]');
    emailInputs.forEach(input => {
        input.addEventListener('blur', function () {
            if (this.value && !window.carpetasLED.validateEmail(this.value)) {
                window.carpetasLED.showError(this, 'Email no válido');
            } else {
                window.carpetasLED.clearError(this);
            }
        });
    });

    // Phone fields
    const phoneInputs = document.querySelectorAll('input[type="tel"]');
    phoneInputs.forEach(input => {
        input.addEventListener('blur', function () {
            if (this.value && !window.carpetasLED.validatePhone(this.value)) {
                window.carpetasLED.showError(this, 'Teléfono no válido');
            } else {
                window.carpetasLED.clearError(this);
            }
        });
    });

    // Required fields
    const requiredInputs = document.querySelectorAll('[required]');
    requiredInputs.forEach(input => {
        input.addEventListener('blur', function () {
            if (!this.value.trim()) {
                window.carpetasLED.showError(this, 'Este campo es obligatorio');
            } else {
                window.carpetasLED.clearError(this);
            }
        });
    });
}

// ========================================
// Initialize
// ========================================
document.addEventListener('DOMContentLoaded', function () {
    // Initialize quote form
    initQuoteForm();

    // Setup form handlers
    const quoteForm = document.getElementById('quote-form');
    if (quoteForm) {
        quoteForm.addEventListener('submit', handleQuoteFormSubmit);
    }

    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', handleContactFormSubmit);
    }

    // Setup real-time validation
    setupRealtimeValidation();
});
