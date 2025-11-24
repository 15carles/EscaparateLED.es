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

    // RGPD checkbox
    if (!formData.get('rgpd')) {
        errors.push('Debes aceptar la política de privacidad');
    }

    return errors;
}

/**
 * Handle quote form submission
 * Validates form and only prevents submission if there are errors
 * If valid, allows Netlify Forms to handle the submission
 */
function handleQuoteFormSubmit(event) {
    const form = event.target;
    const formData = new FormData(form);

    // Validate form
    const errors = validateQuoteForm(formData);

    if (errors.length > 0) {
        // Only prevent default if there are validation errors
        event.preventDefault();
        alert('Por favor, corrige los siguientes errores:\n\n' + errors.join('\n'));
        return;
    }

    // If validation passes, allow the form to submit normally to Netlify
    // No preventDefault() call here - let the browser do its thing
}

/**
 * Handle contact form submission
 * Validates form and only prevents submission if there are errors
 * If valid, allows Netlify Forms to handle the submission
 */
function handleContactFormSubmit(event) {
    const form = event.target;
    const formData = new FormData(form);

    // Basic validation
    const name = formData.get('name');
    const email = formData.get('email');
    const message = formData.get('message');

    if (!name || !email || !message) {
        event.preventDefault();
        alert('Por favor, completa todos los campos obligatorios');
        return;
    }

    if (!window.carpetasLED.validateEmail(email)) {
        event.preventDefault();
        alert('Por favor, introduce un email válido');
        return;
    }

    // If validation passes, allow the form to submit normally to Netlify
    // No preventDefault() call here - let the browser do its thing
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
