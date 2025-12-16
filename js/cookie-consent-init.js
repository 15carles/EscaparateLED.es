/**
 * Configuración Global del Consentimiento de Cookies (Cumplimiento AEPD)
 * Utiliza vanilla-cookieconsent v3
 */

// Definir URLs para las páginas legales relativas a la ruta actual
const PATH_ROOT = window.location.pathname.includes('/legal/') ? '../' : './';
const URL_COOKIES = 'legal/politica-cookies.html';
const URL_PRIVACY = 'legal/politica-privacidad.html';

// Comprobar si la librería CookieConsent está cargada
// Comprobar si la librería CookieConsent está cargada
console.log('Iniciando script de cookies...');

window.addEventListener('load', function () {

    // Crear instancia
    var cc = initCookieConsent();

    // Configuración y ejecución
    cc.run({
        current_lang: 'es',
        autoclear_cookies: true,                   // Limpiar cookies si el usuario cambia preferencias
        page_scripts: true,                        // Gestionar scripts de la página
        // force_consent: true,                   // Forzar banner (opcional)

        // Modo 'opt-in' explícito (GDPR)
        mode: 'opt-in',
        delay: 0,                                  // Sin retraso

        // Configuración de la interfaz
        gui_options: {
            consent_modal: {
                layout: 'cloud',               // 'cloud', 'box', 'bar'
                position: 'bottom center',     // 'bottom left', 'bottom right', etc.
                transition: 'slide'            // 'slide', 'zoom'
            },
            settings_modal: {
                layout: 'box',                 // 'box', 'bar'
                transition: 'slide'            // 'slide', 'zoom'
            }
        },

        // Idiomas y textos
        languages: {
            'es': {
                consent_modal: {
                    title: 'Uso de Cookies',
                    description: 'Utilizamos cookies propias y de terceros para mejorar tu experiencia y analizar el tráfico. Puedes aceptar todas o configurar tus preferencias. <button type="button" data-cc="c-settings" class="cc-link">Configurar</button>',
                    primary_btn: {
                        text: 'Aceptar todo',
                        role: 'accept_all'              // 'accept_selected' or 'accept_all'
                    },
                    secondary_btn: {
                        text: 'Rechazar todo',
                        role: 'accept_necessary'        // 'settings' or 'accept_necessary'
                    }
                },
                settings_modal: {
                    title: 'Preferencias de Cookies',
                    save_settings_btn: 'Guardar preferencias',
                    accept_all_btn: 'Aceptar todo',
                    reject_all_btn: 'Rechazar todo',
                    close_btn_label: 'Cerrar',
                    cookie_table_headers: [
                        { col1: 'Nombre' },
                        { col2: 'Dominio' },
                        { col3: 'Expiración' },
                        { col4: 'Descripción' }
                    ],
                    blocks: [
                        {
                            title: 'Uso de Cookies',
                            description: 'Utilizamos cookies para garantizar las funcionalidades básicas del sitio web y para mejorar su experiencia en línea. Puede elegir, para cada categoría, optar por participar o no cuando lo desee.'
                        },
                        {
                            title: 'Estrictamente necesarias',
                            description: 'Estas cookies son esenciales para el correcto funcionamiento de mi sitio web. Sin estas cookies, el sitio web no funcionaría correctamente.',
                            toggle: {
                                value: 'necessary',
                                enabled: true,
                                readonly: true          // El usuario no puede desactivarlas
                            }
                        },
                        {
                            title: 'Rendimiento y Analíticas',
                            description: 'Estas cookies permiten al sitio web recordar las elecciones que ha realizado en el pasado.',
                            toggle: {
                                value: 'analytics',     // Nombre de la categoría
                                enabled: false,         // Desactivado por defecto (GDPR)
                                readonly: false         // El usuario puede activarlas
                            },
                            cookie_table: [             // Lista de cookies (opcional pero recomendada)
                                {
                                    col1: '^_ga',       // Regex
                                    col2: 'google.com',
                                    col3: '2 años',
                                    col4: 'Google Analytics'
                                },
                                {
                                    col1: '_gid',
                                    col2: 'google.com',
                                    col3: '1 día',
                                    col4: 'Google Analytics'
                                }
                            ]
                        }
                    ]
                }
            }
        }
    });
});
