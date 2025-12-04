/**
 * Supabase Forms Integration - FIXED VERSION
  * Maneja envíos de formularios a Supabase para el sitio web LED Escaparate
 * 
  * Formularios soportados:
  * - Formulario de contacto (contact-form)
  * - Formulario de presupuesto (budget-form)
 */

// Configuración de Supabase
const SUPABASE_URL = 'https://xiorgsacjevmpwihfcbx.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inhpb3Jnc2FjamV2bXB3aWhmY2J4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQyNTY2NjcsImV4cCI6MjA3OTgzMjY2N30.A9JBX-SI5xf7zvy8kVHI878mg4keNcr-QitkNt_GliQ';

// Esperar a que se cargue la librería de Supabase
if (typeof supabase === 'undefined') {
    console.error('Supabase library not loaded! Make sure the CDN script is included before this file.');
}

// Inicializar cliente de Supabase
let supabaseClient;
try {
    supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
    console.log('Supabase client initialized successfully');
} catch (error) {
    console.error('Error initializing Supabase client:', error);
}

/**
 * Attach form submission handler to a form
 * @param {string} formId - El ID del elemento del formulario
 * @param {string} statusId - El ID del elemento de mensaje de estado
 * @param {string} formType - Tipo de formulario ('contact' o 'budget')
 */
function attachSupabaseFormHandler(formId, statusId, formType) {
    const form = document.getElementById(formId);
    if (!form) {
        // Salir silenciosamente si el formulario no existe en esta página
        return;
    }

    const statusEl = document.getElementById(statusId);

    form.addEventListener('submit', async (event) => {
        event.preventDefault();

        // Mostrar estado de carga
        if (statusEl) {
            statusEl.textContent = 'Enviando...';
            statusEl.style.color = 'var(--color-text-light)';
        }

        // Get form data
        const formData = new FormData(form);

        // Construir payload matching Supabase table structure
        const payload = {
            form_type: formType,
            name: formData.get('name') || null,
            email: formData.get('email') || null,
            phone: formData.get('phone') || null,
            company_name: formData.get('company_name') || null,
            business_type: formData.get('business_type') || null,
            province_or_postal: formData.get('province_or_postal') || null,
            shop_width_cm: formData.get('shop_width_cm') ? parseFloat(formData.get('shop_width_cm')) : null,
            shop_height_cm: formData.get('shop_height_cm') ? parseFloat(formData.get('shop_height_cm')) : null,
            model: formData.get('model') || null,
            quantity_estimated: formData.get('quantity_estimated') ? parseInt(formData.get('quantity_estimated')) : null,
            message: formData.get('message') || null,
            accepted_privacy: formData.get('accepted_privacy') ? true : false,
            page_url: window.location.href,
            user_agent: navigator.userAgent
        };

        console.log('Submitting payload:', payload);

        // Validación básica
        if (!payload.email) {
            if (statusEl) {
                statusEl.textContent = 'Por favor, introduce tu email.';
                statusEl.style.color = '#dc3545';
            }
            return;
        }

        if (!payload.message && formType === 'contact') {
            if (statusEl) {
                statusEl.textContent = 'Por favor, escribe un mensaje.';
                statusEl.style.color = '#dc3545';
            }
            return;
        }

        try {
            console.log('Attempting to insert into Supabase...');

            // Insertar en Supabase
            const { data, error } = await supabaseClient
                .from('form_submissions')
                .insert([payload])
                .select();

            if (error) {
                console.error('Supabase error:', error);
                console.error('Error code:', error.code);
                console.error('Error message:', error.message);
                console.error('Error details:', error.details);
                console.error('Error hint:', error.hint);

                if (statusEl) {
                    let errorMessage = 'Ha ocurrido un error al enviar el formulario.';

                    // Provide more specific error messages
                    if (error.message && error.message.includes('Invalid API key')) {
                        errorMessage = 'Error de configuración. Por favor, contacta al administrador.';
                    } else if (error.code === '42501') {
                        errorMessage = 'Error de permisos. Por favor, contacta al administrador.';
                    }

                    statusEl.textContent = errorMessage;
                    statusEl.style.color = '#dc3545';
                }
                return;
            }

            // Éxito!
            console.log('Form submitted successfully:', data);
            form.reset();

            if (statusEl) {
                statusEl.textContent = '✓ Formulario enviado correctamente. Gracias por contactarnos, te responderemos pronto.';
                statusEl.style.color = '#28a745';
            }

            // Optional: Redirect to thank you page after a delay
            setTimeout(() => {
                window.location.href = '/gracias.html';
            }, 2000);

        } catch (err) {
            console.error('Network error:', err);
            console.error('Error type:', err.name);
            console.error('Error message:', err.message);

            if (statusEl) {
                statusEl.textContent = 'Error de conexión. Por favor, verifica tu conexión a internet e inténtalo de nuevo.';
                statusEl.style.color = '#dc3545';
            }
        }
    });
}

/**
 * Load simulator data from localStorage and populate budget form
 * Esta función recupera los datos guardados por el simulador y rellena el formulario de presupuesto
 */
function loadSimulatorData() {
    // Solo ejecutar en la página de presupuesto
    const budgetForm = document.getElementById('budget-form');
    if (!budgetForm) {
        return;
    }

    try {
        // Intentar recuperar datos del simulador
        const simulatorDataStr = localStorage.getItem('simulatorData');

        if (!simulatorDataStr) {
            console.log('No simulator data found in localStorage');
            return;
        }

        const simulatorData = JSON.parse(simulatorDataStr);
        console.log('Simulator data loaded:', simulatorData);

        // Rellenar campos del formulario
        if (simulatorData.showcaseWidth) {
            const widthInput = document.getElementById('quote-showcase-width');
            if (widthInput) {
                widthInput.value = simulatorData.showcaseWidth;
            }
        }

        if (simulatorData.showcaseHeight) {
            const heightInput = document.getElementById('quote-showcase-height');
            if (heightInput) {
                heightInput.value = simulatorData.showcaseHeight;
            }
        }

        if (simulatorData.productId) {
            const productSelect = document.getElementById('quote-product-selector');
            if (productSelect) {
                productSelect.value = simulatorData.productId;
            }
        }

        if (simulatorData.quantity) {
            const quantityInput = document.getElementById('quote-quantity');
            if (quantityInput) {
                quantityInput.value = simulatorData.quantity;
            }
        }

        // Mostrar mensaje de confirmación
        showSimulatorDataLoadedMessage(simulatorData);

        // Limpiar localStorage después de cargar los datos
        localStorage.removeItem('simulatorData');
        console.log('Simulator data loaded successfully and localStorage cleared');

    } catch (error) {
        console.error('Error loading simulator data:', error);
        // Si hay error, limpiar localStorage para evitar problemas futuros
        localStorage.removeItem('simulatorData');
    }
}

/**
 * Show a confirmation message when simulator data is loaded
 * @param {Object} simulatorData - Los datos del simulador
 */
function showSimulatorDataLoadedMessage(simulatorData) {
    // Crear elemento de mensaje si no existe
    let messageEl = document.getElementById('simulator-data-loaded-message');

    if (!messageEl) {
        messageEl = document.createElement('div');
        messageEl.id = 'simulator-data-loaded-message';
        messageEl.style.cssText = `
            background: linear-gradient(135deg, #d4edda 0%, #c3e6cb 100%);
            color: #155724;
            padding: 1rem 1.5rem;
            border-radius: var(--border-radius-md);
            border-left: 4px solid #28a745;
            margin-bottom: 1.5rem;
            font-size: var(--font-size-sm);
            box-shadow: 0 2px 8px rgba(0,0,0,0.1);
        `;

        // Insertar antes del formulario
        const budgetForm = document.getElementById('budget-form');
        if (budgetForm && budgetForm.parentNode) {
            budgetForm.parentNode.insertBefore(messageEl, budgetForm);
        }
    }

    // Construir mensaje con detalles
    const details = [];
    if (simulatorData.showcaseWidth && simulatorData.showcaseHeight) {
        details.push(`${simulatorData.showcaseWidth}×${simulatorData.showcaseHeight} cm`);
    }
    if (simulatorData.productName) {
        details.push(simulatorData.productName);
    }
    if (simulatorData.quantity) {
        details.push(`${simulatorData.quantity} carpetas`);
    }

    messageEl.innerHTML = `
        <strong>✓ Configuración del simulador cargada automáticamente</strong><br>
        <span style="opacity: 0.9;">${details.join(' • ')}</span>
    `;
}

// Initialize forms when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM loaded, initializing forms...');

    // Check if Supabase client is available
    if (!supabaseClient) {
        console.error('Supabase client not initialized! Forms will not work.');
        return;
    }

    // Cargar datos del simulador si existen
    loadSimulatorData();

    // Attach handlers to both forms
    attachSupabaseFormHandler('contact-form', 'contact-status', 'contact');
    attachSupabaseFormHandler('budget-form', 'budget-status', 'budget');

    console.log('Form handlers attached');
});
