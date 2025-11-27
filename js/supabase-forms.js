/**
 * Supabase Forms Integration - FIXED VERSION
 * Handles form submissions to Supabase for LED Escaparate website
 * 
 * Forms supported:
 * - Contact form (contact-form)
 * - Budget/Quote form (budget-form)
 */

// Supabase configuration
const SUPABASE_URL = 'https://xiorgsacjevmpwihfcbx.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inhpb3Jnc2FjamV2bXB3aWhmY2J4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQyNTY2NjcsImV4cCI6MjA3OTgzMjY2N30.A9JBX-SI5xf7zvy8kVHI878mg4keNcr-QitkNt_GliQ';

// Wait for Supabase library to load
if (typeof supabase === 'undefined') {
    console.error('Supabase library not loaded! Make sure the CDN script is included before this file.');
}

// Initialize Supabase client
let supabaseClient;
try {
    supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
    console.log('Supabase client initialized successfully');
} catch (error) {
    console.error('Error initializing Supabase client:', error);
}

/**
 * Attach form submission handler to a form
 * @param {string} formId - The ID of the form element
 * @param {string} statusId - The ID of the status message element
 * @param {string} formType - Type of form ('contact' or 'budget')
 */
function attachSupabaseFormHandler(formId, statusId, formType) {
    const form = document.getElementById(formId);
    if (!form) {
        // Exit silently if form doesn't exist on this page
        return;
    }

    const statusEl = document.getElementById(statusId);

    form.addEventListener('submit', async (event) => {
        event.preventDefault();

        // Show loading state
        if (statusEl) {
            statusEl.textContent = 'Enviando...';
            statusEl.style.color = 'var(--color-text-light)';
        }

        // Get form data
        const formData = new FormData(form);

        // Build payload matching Supabase table structure
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

        // Basic validation
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

            // Insert into Supabase
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

            // Success!
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

// Initialize forms when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM loaded, initializing forms...');

    // Check if Supabase client is available
    if (!supabaseClient) {
        console.error('Supabase client not initialized! Forms will not work.');
        return;
    }

    // Attach handlers to both forms
    attachSupabaseFormHandler('contact-form', 'contact-status', 'contact');
    attachSupabaseFormHandler('budget-form', 'budget-status', 'budget');

    console.log('Form handlers attached');
});
