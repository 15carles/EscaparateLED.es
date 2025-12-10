# 📋 CHANGELOG - LED Escaparate Website

## [2.12.1] - 2025-12-10

### 🤖 Implementación de Archivos Meta (SEO + IA SEO 2026)
- ✅ **robots.txt actualizado** - Optimización completa para SEO e IA
  * Permite todos los bots principales (Google, Bing, DuckDuckGo, Yandex)
  * Permite bots de IA (GPTBot, ClaudeBot, Google-Extended, PerplexityBot, Applebot, Meta AI, CCBot, Bytespider)
  * Sitemap y host canónico configurados
  * Notas de mantenimiento y próxima revisión (01-06-2026)

- ✅ **humans.md** - Información del equipo en formato Markdown
  * Equipo: Carles del Olmo (Founder/Tech Lead) + Vicente (Commercial)
  * Stack tecnológico completo
  * Filosofía del proyecto y valores
  * Roadmap público 2026
  
- ✅ **humans.html** - Versión web navegable
  * Estilos adaptados a identidad corporativa (Inter font, colores azules)
  * Diseño responsive con cards
  * Contenido completo sobre equipo, tecnología y visión

- ✅ **humans.json** - Datos estructurados machine-readable
  * JSON válido con toda la información del proyecto
  * Incluye ai_policy con llms_usage_allowed: true
  * Roadmap y valores estructurados

- ✅ **humans.txt** - Formato estándar humanstxt.org
  * Secciones: PROJECT INFO, TEAM, TECHNOLOGY STACK, PHILOSOPHY, AI & ETHICS, ROADMAP, CREDITS
  * Compatible con estándar humanstxt.org

- ✅ **llms.txt** - Optimización IA SEO 2026
  * Política de uso abierta para modelos de IA
  * Señales de relevancia para agentes de IA
  * Atribución sugerida y secciones principales
  * Recomendaciones para exploración y análisis

#### Beneficios
- Mejora indexación en buscadores tradicionales y con IA
- Transparencia total sobre equipo y tecnología
- Facilita descubrimiento por asistentes de IA (ChatGPT, Claude, Gemini, Perplexity)
- Múltiples formatos para diferentes consumidores (humanos, máquinas, IA)

## [2.12.0] - 2025-12-08

### 🎯 Simplificación de Formulario de Presupuesto (Progressive Disclosure)
- ✅ **Campo "Nombre de la empresa" eliminado** - Reducción de fricción
  * Solo "Persona de contacto" como identificador principal
  * 44% menos campos visibles inicialmente (de 9 a 5)
- ✅ **Progressive Disclosure implementado** - Detalles técnicos opcionales
  * Checkbox trigger: "🔘 Tengo las medidas o sé qué modelos necesito"
  * Campos técnicos ocultos por defecto (ancho, alto, modelo, cantidad)
  * Transiciones suaves fade in/out (300ms)
  * Auto-expand para usuarios del simulador
- ✅ **Fix crítico: Transferencia de modelo desde simulador**
  * Implementado retry logic en `supabase-forms.js`
  * Espera a que `products.js` pueble el selector antes de establecer valor
  * Ahora TODOS los datos del simulador se transfieren correctamente

#### Cambios Técnicos
- Modificado `presupuesto.html` con estructura de progressive disclosure
- Actualizado `js/supabase-forms.js` con retry logic para selector de modelo
- JavaScript detecta parámetros GET y datos en localStorage
- Auto-marca checkbox y expande detalles si viene del simulador

#### Beneficios UX
- Reducción de carga cognitiva: 44% menos campos iniciales
- Mejor tasa de conversión esperada
- Experiencia fluida para usuarios del simulador
- Flexibilidad para usuarios avanzados con detalles técnicos

## [2.11.0] - 2025-12-08

### 📱 Mejoras de Responsividad Móvil
- ✅ **Header spacing optimizado** - Logo y navegación con padding horizontal adecuado
  * Padding horizontal en `.nav`: `var(--spacing-md)`
  * Padding horizontal en `.container`: `var(--spacing-md)`
  * Logo reducido a `var(--font-size-xl)` en móvil
- ✅ **Indicador visual de scroll en tablas** - Gradiente blanco indica más contenido
  * Desaparece automáticamente al llegar al final
  * Hint text "← Desliza para ver más →" visible solo en móvil
  * JavaScript detecta scroll completo
- ✅ **Tabla de especificaciones optimizada** para móvil
  * Font-size reducido a 0.85rem
  * Padding optimizado en celdas
- ✅ **Simulador grid mejorado** en pantallas pequeñas
  * Tamaño mínimo 20x20px para elementos
  * Gap reducido de 8px a 6px
  * Font-size 0.7rem en móvil

#### Cambios Técnicos
- Actualizado `css/main.css` con media queries móvil
- Actualizado `css/simulator.css` con tamaños mínimos
- Añadido `productos.html` con hint text y script de scroll
- Auditoría completa de responsividad móvil (375x667)

#### Calidad Móvil
- ⭐⭐⭐⭐⭐ Usabilidad excelente
- Sin overflow horizontal
- Botones con área táctil ≥44px
- Texto legible en todos los tamaños

## [2.10.0] - 2025-12-07

### 🖼️ Sistema de Galería Multi-Imagen
- ✅ **Carrusel de imágenes** en tarjetas de productos con navegación suave
- ✅ **Imágenes compartidas inteligentes** - 7 archivos para 12 imágenes totales
  * Imagen 1: Específica de cada producto
  * Imagen 2: Compartida por orientación (vertical/horizontal)
  * Imagen 3: Universal para todos los productos
- ✅ **Navegación completa** con flechas (hover), indicadores de puntos y teclado (← →)
- ✅ **Transiciones suaves** con efecto fade entre imágenes
- ✅ **Retrocompatible** funciona con 1 o múltiples imágenes
- ✅ **Responsive** mantiene altura de 250px en todos los dispositivos

### 🔧 Correcciones de Información Técnica
- ✅ **Información de instalación actualizada** en 6 archivos
  * Reemplazado "adhesivo 3M" por sistema correcto de riel electrificado
  * Actualizado FAQ en `simulador.html` (visible y Schema.org)
  * Corregido blog y README con información técnica precisa
- ✅ **SEO mejorado** con Schema.org FAQPage actualizado

#### Cambios Técnicos
- Actualizado `js/products.js` con lógica de imágenes compartidas
- Añadido `css/main.css` con estilos completos del carrusel
- Corregido timing de inicialización de galerías (DOMContentLoaded)
- Actualizado `simulador.html`, `blog-carpetas-led-vs-escaparates-tradicionales.html`, `README.md`

#### Archivos de Imágenes
- `a4-vertical-1.webp`, `a4-horizontal-1.webp`
- `a3-vertical-1.webp`, `a3-horizontal-1.webp`
- `a3-y-a4-vertical.webp`, `a3-y-a4-horizontal.webp`
- `a3-y-a4-vertical-y-horizontal.webp`

## [2.9.0] - 2025-12-07

### 🎨 Mejoras Visuales del Simulador
- ✅ **Diseño minimalista limpio** con fondo gris cemento arquitectónico (#aab2b7)
- ✅ **Efecto LED realista** con resplandor blanco puro en carpetas
- ✅ **Funcionalidad interactiva** click-to-toggle para encender/apagar carpetas
- ✅ **Contador dinámico** actualización en tiempo real del total de carpetas activas
- ✅ **Contenedor unificado** eliminado efecto "caja dentro de caja"
- ✅ **Contraste mejorado** entre estados encendido/apagado con scale(0.95) y sombra interna
- ✅ **Borde punteado elegante** (#6c757d) sobre fondo gris cemento

#### Cambios Técnicos
- Actualizado `css/simulator.css` con diseño minimalista
- Actualizado `js/simulator.js` con funcionalidad de toggle interactivo
- Eliminados cables tensores para diseño más limpio
- Unificados contenedores `.grid-wrapper` y `.showcase-grid`

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
