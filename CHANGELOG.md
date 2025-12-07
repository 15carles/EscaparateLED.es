# 📋 CHANGELOG - LED Escaparate Website

## [2.8.1] - 2025-12-07

### 🔢 Actualización de Ejemplos del Simulador
- ✅ **Ejemplos recalculados con datos realistas** en `simulador.html`
  * Escaparate Pequeño (2.5m × 2m): 7×4 = 28 carpetas A4 Vertical
  * Escaparate Mediano (4m × 2.5m): 9×4 = 36 carpetas A3 Vertical
  * Escaparate Grande (6m × 3m): 14×5 = 70 carpetas A3 Vertical
- ✅ Cálculos basados en lógica real del simulador (márgenes 15cm, separación 10cm)
- ✅ Ejemplos verificados con pruebas funcionales del simulador

## [2.3.1] - 2025-12-03

### 📚 Actualización de Documentación
- Corrección de versión actual en README.md (2.2.0 → 2.3.1)
- Eliminación de referencias a Netlify Forms (reemplazadas por Supabase)
- Corrección de información sobre archivos de configuración (_headers/_redirects → netlify.toml)
- Actualización de CHANGELOG.md con versiones faltantes
- Confirmación de Cloudflare Pages como plataforma de despliegue

## [2.3.0] - 2025-11-26

### 🤖 Optimización Avanzada para Agentes de IA
- Implementación de Schema.org FAQPage en páginas relevantes
- Implementación de Schema.org BreadcrumbList para navegación
- Implementación de Schema.org Article en posts de blog
- Implementación de Schema.org HowTo para contenido instructivo
- Mejoras en metadatos semánticos para ChatGPT, Gemini y SGE
- Optimización de atributos autocomplete en formularios

## [2.2.0] - 2025-11-25

### 📝 Sistema de Blog y Estrategia de Instalación
- Sistema de blog escalable con documentación completa
- Estrategia híbrida de instalación (Valencia local vs Nacional)
- Campo ubicación en formulario de presupuesto
- Nuevas FAQs sobre instalación
- Corrección de estilos en blog-post.html
- Documentación inline en blog.html y blog-post.html

## [2.1.0] - 2025-11-24

### ⚖️ Actualización Legal y Mejoras de Formularios
- Actualización completa de textos legales (RGPD/LOPDGDD)
- Integración completa con Supabase Forms
- Mejoras de accesibilidad en formularios (WCAG 2.1 Level AA)
- Campo "Modelo deseado" ahora opcional
- Corrección de estilos en formulario de presupuesto
- Cláusulas legales detalladas en formularios
- Política de Privacidad adaptada a Supabase

## [2.0.0] - 2025-11-24

### 🏷️ BREAKING CHANGES - Rebranding
- Cambio de marca: "Carpetas LED" → "LED Escaparate"
- Cambio de dominio: carpetasled.es → ledescaparate.es
- Logos actualizados en navegación y footer (14 archivos)
- Títulos de página actualizados (13 archivos)
- Meta tags actualizados (descriptions, keywords, author, OG)
- Copyright actualizado: © 2024 LED Escaparate

### 📧 Actualización de Datos de Contacto
- Email: contacto@ledescaparate.es
- Teléfono: +34 626 612 141
- Ubicación: Valencia, España
- 62 actualizaciones en 14 archivos HTML

### ♿ Mejoras de Accesibilidad
- Formulario de presupuesto mejorado con WCAG 2.1 Level AA
- Desplegable "Tipo de Negocio" ampliado (7 opciones)
- Estructura semántica con fieldset y legend
- Atributos ARIA completos (aria-label, aria-required, aria-describedby)
- Autocompletado HTML5 en campos de formulario
- Nueva clase CSS .visually-hidden

### 📄 Nuevas Páginas
- gracias.html - Página de agradecimiento con redirección automática
- 404.html - Página de error 404 con búsqueda funcional
- error-formulario.html - Página de error de formulario

### ⚙️ Configuración de Netlify
- netlify.toml - Configuración con redirects, security headers y cache
- Integración de Netlify Forms en presupuesto.html y contacto.html
- Formularios configurados con envío tradicional (POST)

### 📊 Estadísticas
- Archivos modificados: 11
- Archivos nuevos: 4
- Total de cambios: ~200 actualizaciones
- Líneas de código añadidas: ~1,200

## [1.0.0] - 2024-11-23
- Lanzamiento inicial del sitio web
- Integración básica de Netlify Forms
- Configuración de dominio personalizado
