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

if (typeof CookieConsent === 'undefined') {
    console.error('¡La librería CookieConsent no está cargada!');
} else {
    console.log('CookieConsent cargado correctamente.');
    CookieConsent.run({
        gui_options: {
            consent_modal: {
                layout: 'box',
                position: 'bottom right',
                equal_weight_buttons: true,
                flip_buttons: false
            },
            preferences_modal: {
                layout: 'box',
                position: 'right',
                equal_weight_buttons: true,
                flip_buttons: false
            }
        },

        categories: {
            necessary: {
                readOnly: true,
                enabled: true
            },
            analytics: {
                enabled: false, // Desactivado por defecto (Opt-in)
                autoClear: {
                    cookies: [
                        {
                            name: /^_ga/,   // Regex: coincide con todas las cookies que empiezan por '_ga'
                        },
                        {
                            name: '_gid',
                        }
                    ]
                }
            }
        },

        language: {
            default: 'es',
            translations: {
                es: {
                    consent_modal: {
                        title: 'Uso de Cookies',
                        description: 'Utilizamos cookies propias y de terceros para garantizar el funcionamiento correcto del sitio web y mejorar tu experiencia. Puedes configurar tus preferencias o aceptarlas todas. Más información en nuestra <a href="' + URL_COOKIES + '" target="_blank">Política de Cookies</a>.',
                        primary_btn: {
                            text: 'Aceptar todo',
                            role: 'accept_all'
                        },
                        secondary_btn: {
                            text: 'Rechazar todo',
                            role: 'accept_necessary'
                        },
                        footer: '<a href="' + URL_PRIVACY + '" target="_blank">Política de Privacidad</a>'
                    },
                    preferences_modal: {
                        title: 'Centro de Preferencias de Cookies',
                        accept_all_btn: 'Aceptar todo',
                        accept_necessary_btn: 'Rechazar todo',
                        save_preferences_btn: 'Guardar preferencias',
                        close_btn_label: 'Cerrar',
                        sections: [
                            {
                                title: 'Uso de Cookies',
                                description: 'Aquí puedes elegir qué categorías de cookies deseas habilitar. Las cookies necesarias no se pueden desactivar ya que son fundamentales para que el sitio funcione.'
                            },
                            {
                                title: 'Estrictamente Necesarias',
                                description: 'Estas cookies son esenciales para el funcionamiento del sitio web (navegación, seguridad, acceso a áreas seguras). No se pueden desactivar.',
                                linked_category: 'necessary'
                            },
                            {
                                title: 'Rendimiento y Analíticas',
                                description: 'Nos permiten contar las visitas y fuentes de tráfico para medir y mejorar el rendimiento de nuestro sitio. Toda la información que recogen estas cookies es agregada y, por lo tanto, anónima.',
                                linked_category: 'analytics'
                            }
                        ]
                    }
                }
            }
        }
    });
}
