# 🌟 LED Escaparate - Website Oficial

![Version](https://img.shields.io/badge/version-2.15.0-blue)
![Status](https://img.shields.io/badge/status-production-success)
![Mobile](https://img.shields.io/badge/mobile-optimized-green)
[![License](https://img.shields.io/badge/license-Proprietary-red.svg)](LICENSE)

> Sitio web profesional para LED Escaparate - Especialistas en carpetas retroiluminadas LED para escaparates inmobiliarios en toda España.

**🌐 Sitio web:** [https://ledescaparate.es](https://ledescaparate.es)

---

## 📋 Descripción del Proyecto

Plataforma web completa para la promoción y venta de carpetas retroiluminadas LED destinadas a escaparates de inmobiliarias, agencias, clínicas y comercios especializados en España. Desarrollado con tecnologías web modernas (HTML5, CSS3, JavaScript vanilla) para máxima compatibilidad, rendimiento y facilidad de mantenimiento.

### 🎯 Objetivos del Sitio

- Mostrar catálogo de productos LED profesionales
- Proporcionar simulador interactivo híbrido con columnas independientes
- Facilitar solicitudes de presupuesto personalizadas
- Ofrecer información técnica y comercial
- Cumplir con normativa legal española (RGPD, LOPDGDD, LSSI-CE)

---

## ✨ Características Principales

### 🎨 Diseño y UX
- ✅ Diseño responsive y mobile-first
- ✅ Interfaz moderna con glassmorphism y animaciones suaves
- ✅ Paleta de colores profesional y accesible
- ✅ Tipografía Inter (Google Fonts) para máxima legibilidad
- ✅ Navegación intuitiva con menú hamburguesa en móviles

### 🛠️ Funcionalidades
- ✅ **Simulador Híbrido V2** con sistema de columnas independientes
  - Configuración automática inicial + personalización por columna
  - Modo Noche con fondo personalizado (100% client-side)
  - Cálculos técnicos en tiempo real (consumo, fuente de alimentación)
  - Integración stateless via URL para comerciales
  - Selectores desktop + Bottom Sheet móvil (botones 44px+)
- ✅ **Sistema de productos modular** fácilmente actualizable
- ✅ **Formularios inteligentes** con validación client-side y autocomplete
- ✅ **Integración Supabase** para gestión de formularios y almacenamiento
- ✅ **Widget flotante de WhatsApp** con estética Soft Green y diseño responsivo
- ✅ **Optimización para agentes de IA** (ChatGPT, Gemini, SGE)
- ✅ **Schema JSON-LD** para comprensión de negocio por IA
- ✅ **Páginas de respuesta** (gracias, 404, error)
- ✅ **Blog escalable** con sistema de plantillas documentado
- ✅ **Estrategia híbrida de instalación** (Valencia local vs Nacional)

### 🔒 Seguridad y Legal
- ✅ Cumplimiento **RGPD/LOPDGDD** completo
- ✅ Política de Privacidad adaptada a Supabase
- ✅ Política de Cookies (solo técnicas)
- ✅ Aviso Legal y Condiciones de Uso
- ✅ Cláusulas legales en formularios
- ✅ Headers de seguridad configurados

### 🚀 Rendimiento y SEO
- ✅ Optimización SEO para España (Valencia, Madrid, Barcelona)
- ✅ Meta tags completos en todas las páginas
- ✅ Open Graph para redes sociales
- ✅ Estructura semántica HTML5 con elementos `<main>`
- ✅ Schema.org JSON-LD (LocalBusiness, Product)
- ✅ Caché optimizado para assets estáticos
- ✅ Imágenes optimizadas y lazy loading

### 🤖 Meta Files (SEO + IA SEO 2026)
- ✅ **robots.txt** - Optimización completa para bots tradicionales y de IA
  - Permite todos los bots principales (Google, Bing, DuckDuckGo, Yandex)
  - Permite bots de IA (GPTBot, ClaudeBot, Google-Extended, PerplexityBot, Applebot, Meta AI)
  - Sitemap y host canónico configurados
- ✅ **llms.txt** - Política de uso para modelos de IA
  - Autorización abierta para uso de contenido
  - Señales de relevancia para agentes de IA
  - Atribución sugerida y secciones principales
- ✅ **humans.md** - Información del equipo en Markdown
- ✅ **humans.html** - Versión web navegable con estilos corporativos
- ✅ **humans.json** - Datos estructurados machine-readable
- ✅ **humans.txt** - Formato estándar humanstxt.org
- ✅ **sitemap.xml** - Actualizado con todos los archivos meta

### 🤖 Compatibilidad con Agentes de IA (GEO Avanzado)
- ✅ **Atributos autocomplete** en formularios para autocompletado de IA
- ✅ **Schema LocalBusiness** con QuoteAction y micro-targeting geográfico (29 ubicaciones)
- ✅ **AggregateRating** (4.9/5 estrellas, 118 reseñas) para Rich Snippets
- ✅ **Schema Product** con especificaciones técnicas estructuradas
- ✅ **Schema DefinedTermSet** - Glosario técnico de 10 términos especializados
- ✅ **Schema HowTo** - Guía de instalación paso a paso
- ✅ **Schema Article** - Blog posts con metadatos completos
- ✅ **Schema ItemList** - Rankings "Best of" para búsquedas comparativas
- ✅ **Contenido semántico oculto** - Bloques de información estructurada para IAs
- ✅ **Tablas comparativas** con datos técnicos parseables
- ✅ **Elementos semánticos** (`<main>`, `<header>`, `<nav>`) para navegación de IA
- ✅ **Aria-labels** descriptivos en campos de formulario
- ✅ Optimizado para ChatGPT, Google Gemini, Claude y SGE

---

## 📁 Estructura del Proyecto

```
led-escaparate/
├── index.html                 # Página principal
├── productos.html             # Catálogo de productos
├── simulador.html             # Simulador de escaparate
├── presupuesto.html           # Formulario de presupuesto
├── contacto.html              # Página de contacto
├── blog.html                  # Listado de blog (con documentación)
├── blog-post.html             # Plantilla de artículo (documentada)
├── blog-mejores-sistemas-iluminacion-2025.html  # Blog: Comparativa 2025 (Schema ItemList)
├── blog-carpetas-led-vs-escaparates-tradicionales.html  # Blog: LED vs Tradicional
├── gracias.html               # Página de agradecimiento
├── 404.html                   # Página de error 404
├── error-formulario.html      # Página de error de formulario
│
├── css/
│   ├── main.css              # Estilos principales
│   └── simulator.css         # Estilos del simulador
│
├── js/
│   ├── main.js               # JavaScript principal (navegación, cookies)
│   ├── products.js           # Gestión de productos y catálogo
│   ├── simulator.js          # Lógica del simulador V2 (columnas independientes, modo noche)
│   ├── forms.js              # Validación de formularios (legacy)
│   └── supabase-forms.js     # Integración con Supabase
│
├── images/
│   ├── products/             # Imágenes de productos
│   └── icons/                # Iconos SVG
│
├── legal/
│   ├── aviso-legal.html      # Aviso Legal
│   ├── politica-privacidad.html  # Política de Privacidad (RGPD)
│   ├── politica-cookies.html     # Política de Cookies
│   └── condiciones-uso.html      # Condiciones de Uso
│
├── CHANGELOG.md              # Registro de cambios
├── VERSION                   # Versión actual (2.3.1)
└── README.md                 # Este archivo
```

---

## 🚀 Inicio Rápido

### Requisitos Previos

- Navegador web moderno
- Editor de código (VS Code recomendado)
- Git (para control de versiones)
- Cuenta en GitHub (para repositorio)
- Cuenta en Cloudflare Pages (para despliegue)

### Instalación Local

```bash
# Clonar el repositorio
git clone https://github.com/15carles/EscaparateLED.es.git

# Navegar al directorio
cd EscaparateLED.es

# Abrir con un servidor local (opcional)
# Opción 1: Python
python -m http.server 8000

# Opción 2: Node.js
npx serve

# Opción 3: VS Code Live Server
# Instalar extensión "Live Server" y hacer clic derecho > "Open with Live Server"
```

Visita `http://localhost:8000` en tu navegador.

---

## ⚙️ Configuración

### 1. Gestión de Productos

Los productos se gestionan en `js/products.js`. Para añadir un nuevo producto:

```javascript
{
  id: 'a3-vertical-simple',
  name: 'A3 Vertical Simple',
  dimensions: {
    width: 46,
    height: 33
  },
  image: 'images/products/a3-vertical-simple.jpg',
  description: 'Carpeta LED A3 vertical con iluminación simple',
  usage: 'Ideal para escaparates estándar',
  specs: {
    lighting: 'LED blanco frío 6500K',
    material: 'Acrílico transparente 3mm',
    consumption: '12W',
    installation: 'Suspendida por cables'
  },
  featured: true
}
```

### 2. Sistema de Blog Escalable

El blog está completamente documentado para facilitar la adición de nuevos posts:

#### Añadir un Nuevo Post

1. **Duplicar la plantilla:**
   ```bash
   cp blog-post.html blog-nombre-descriptivo.html
   ```

2. **Editar el nuevo archivo:**
   - Buscar comentarios `✏️ EDITAR:` en el código
   - Modificar: título, fecha, tags, contenido
   - Actualizar meta tags SEO en `<head>`

3. **Añadir al listado:**
   - Abrir `blog.html`
   - Copiar un bloque `<article class="product-card">`
   - Modificar: fecha, título, extracto, enlace

**Documentación completa:**
- `blog.html`: Comentarios detallados sobre cómo añadir posts al listado
- `blog-post.html`: Guía completa de uso como plantilla (líneas 2-122)

### 3. Supabase Forms

Los formularios están integrados con Supabase:

- **Formulario de presupuesto:** `presupuesto.html`
- **Formulario de contacto:** `contacto.html`

**Configuración:**
- Script de integración: `js/supabase-forms.js`
- Cliente Supabase: `@supabase/supabase-js@2.39.0` (CDN jsdelivr UMD)
- Tabla destino: `public.form_submissions`
- RLS (Row Level Security): Desactivado para formularios públicos
- Validación client-side de campos obligatorios
- Redirección a `/gracias.html` tras envío exitoso

**Optimizaciones para IA:**
- Atributos `autocomplete` en todos los campos
- `aria-label` descriptivos para campos sin label visible
- Tipos de input correctos (`email`, `tel`, `number`)

**Acceso a envíos:**
1. Ir a Supabase Dashboard: https://supabase.com/dashboard
2. Seleccionar proyecto
3. Table Editor → `form_submissions`
4. Ver, filtrar y exportar datos

**Campos de la tabla:**
- `form_type`: 'contact' o 'budget'
- `name`, `email`, `phone`, `message`
- `company_name`, `business_type`, `province_or_postal`
- `shop_width_cm`, `shop_height_cm`, `model`, `quantity_estimated`
- `accepted_privacy`, `page_url`, `user_agent`

### 4. Configuración de Cloudflare Pages

El archivo `netlify.toml` incluye configuración de headers de seguridad y cache:

- Headers de seguridad (X-Frame-Options, X-Content-Type-Options, etc.)
- Cache agresivo para assets estáticos (CSS, JS, imágenes): 1 año
- Cache corto para HTML: 1 hora con revalidación
- Redirect 404 a `/404.html`
- Compresión Brotli automática

---

## 🌐 Despliegue

### Cloudflare Pages (Actual)

**Despliegue automático configurado:**

1. Push a GitHub → Deploy automático en Cloudflare Pages
2. URL: https://ledescaparate.es
3. SSL automático
4. CDN global de Cloudflare
5. Formularios gestionados por Supabase

**Acceso al dashboard:**
- Cloudflare Pages: https://dash.cloudflare.com/
- Supabase Dashboard: https://supabase.com/dashboard
- GitHub Repository: https://github.com/15carles/EscaparateLED.es

**Proceso de despliegue:**
```bash
# 1. Hacer cambios localmente
git add .
git commit -m "descripción del cambio"

# 2. Subir a GitHub
git push origin main

# 3. Cloudflare Pages despliega automáticamente
# Ver progreso en: https://dash.cloudflare.com/
```

### Otros Servicios

#### Vercel
```bash
vercel --prod
```

#### GitHub Pages
1. Settings → Pages
2. Source: main branch
3. URL: `https://15carles.github.io/EscaparateLED.es`

#### Hosting Tradicional (cPanel/FTP)
1. Comprimir todos los archivos
2. Subir a `public_html`
3. Configurar dominio

---

## 🤖 Estrategia GEO (Generative Engine Optimization)

### Objetivo
Optimizar el sitio web para que los agentes de IA (ChatGPT, Gemini, Claude, Perplexity) puedan:
- Comprender el negocio y productos con precisión
- Responder preguntas técnicas con nuestras definiciones
- Recomendar nuestros servicios en búsquedas relevantes
- Citar datos estructurados como fuente de autoridad

### Implementaciones Clave

#### 1. Micro-Targeting Geográfico (`index.html`)
- **29 ubicaciones** en schema LocalBusiness con desambiguación Wikipedia
- Ciudades prioritarias: Valencia, Alicante, Castellón, Murcia, Barcelona, Madrid...
- Cobertura nacional completa (España)
- **Beneficio**: IAs recomiendan el servicio para ubicaciones específicas

#### 2. AggregateRating (`index.html`)
- **4.9/5 estrellas** con 118 reseñas
- Rich Snippets en Google (estrellas doradas)
- **Beneficio**: +30-40% CTR, prueba social estructurada

#### 3. Vocabulario Técnico (`productos.html`)
- **Schema DefinedTermSet** con 10 términos especializados:
  - Papel Backlit, Tensor Electrificado, Driver LED 12V
  - PMMA Óptico, Cierre Magnético, Formatos DIN
  - Carpeta LED Inmobiliaria, Luz Blanco Frío (6000K)
  - Vida Útil Nominal, Carpeta Doble Cara
- **Beneficio**: IAs citan nuestras definiciones como autoridad

#### 4. Contenido Semántico Oculto
- Bloques `display:none` con información estructurada para IAs
- Datos conservadores: ROI, tiempos de instalación, configuraciones típicas
- Ubicación: `productos.html`, `index.html`, `presupuesto.html`
- **Beneficio**: IAs responden preguntas específicas sin afectar UX

#### 5. Tablas Comparativas
- Especificaciones técnicas (A3/A4, Vertical/Horizontal)
- Comparativa LED vs Tradicional vs Pantallas Digitales
- Clases CSS reutilizables (`.table-corporate`)
- **Beneficio**: Datos parseables para comparaciones directas

#### 6. Blog Posts Estratégicos
- **"Mejores Sistemas Iluminación 2025"** - Schema ItemList (ranking)
- **"Carpetas LED vs Tradicionales"** - Comparativa directa
- **Beneficio**: Captura búsquedas "Best of" y comparativas

#### 7. Guías Paso a Paso
- **Schema HowTo** - Instalación de carpetas LED
- 4 pasos detallados con herramientas y materiales
- **Beneficio**: IAs pueden guiar instalaciones

#### 8. WebApplication Schema (`simulador.html`)
- **Simulador definido como aplicación de software**
- Categoría: DesignApplication
- Precio: Gratuito (0€)
- **Beneficio**: IAs reconocen el simulador como herramienta funcional

#### 9. Wikipedia Anchoring (`index.html`)
- **9 conceptos clave** anclados a Wikipedia:
  - Real Estate Broker, Agencia de Viajes, Corredor de Seguros
  - Escaparatismo, Visual Merchandising, PLV
  - LED, Retroiluminación, PMMA
- **Beneficio**: Autoridad semántica por asociación con conceptos establecidos

#### 10. Datos Eco + Garantía (`productos.html`)
- **Eficiencia energética**: A++ (12-16W por carpeta)
- **Garantía**: 2 años de reposición total
- **Beneficio**: Confianza, sostenibilidad y transparencia comercial

### Métricas de Éxito
- ✅ 29 ubicaciones geográficas indexadas
- ✅ 10 términos técnicos definidos
- ✅ 9 conceptos Wikipedia anclados
- ✅ 6 schemas diferentes implementados (LocalBusiness, Product, DefinedTermSet, HowTo, Article, ItemList, WebApplication)
- ✅ 3 páginas con contenido semántico oculto
- ✅ 2 blog posts con schemas especializados
- ✅ Eficiencia energética A++ declarada
- ✅ Garantía de 2 años estructurada

---

## 🎨 Personalización

### Colores y Estilos

Los colores se gestionan con CSS Custom Properties en `css/main.css`:

```css
:root {
  /* Colores principales */
  --color-primary: #0066FF;
  --color-primary-dark: #0052CC;
  --color-secondary: #1a1a2e;
  
  /* Colores de fondo */
  --color-background: #FFFFFF;
  --color-background-alt: #F8F9FA;
  
  /* Colores de texto */
  --color-text: #1a1a2e;
  --color-text-light: #6c757d;
  
  /* Tipografía */
  --font-primary: 'Inter', sans-serif;
  
  /* Espaciado */
  --spacing-xs: 0.25rem;
  --spacing-sm: 0.5rem;
  --spacing-md: 1rem;
  --spacing-lg: 1.5rem;
  --spacing-xl: 2rem;
  
  /* Sombras */
  --shadow-sm: 0 1px 2px rgba(0,0,0,0.05);
  --shadow-md: 0 4px 6px rgba(0,0,0,0.1);
  --shadow-lg: 0 10px 15px rgba(0,0,0,0.1);
}
```

### Añadir Imágenes

**Productos:**
- Ubicación: `images/products/`
- Formato: JPG/PNG optimizado
- Tamaño recomendado: 800x800px
- Nombre: Usar ID del producto (ej: `a3-vertical-simple.jpg`)

**Hero/Banner:**
- Ubicación: `images/`
- Formato: JPG optimizado
- Tamaño: 1920x1080px mínimo

---

## 📊 SEO

### Palabras Clave Principales

- carpetas# LED Escaparate - Carpetas LED Retroiluminadas para Inmobiliarias
**Versión:** 2.6.0  
**Última actualización:** Diciembre 2024
- marcos LED inmobiliaria
- escaparates iluminados
- carpetas retroiluminadas
- LED escaparate Valencia

### Ubicaciones Geográficas

- Valencia (principal)
- Madrid
- Barcelona
- Alicante
- Toda España

### Optimizaciones Implementadas

- ✅ Meta tags en todas las páginas
- ✅ Open Graph para redes sociales
- ✅ Estructura semántica HTML5
- ✅ Headings jerárquicos (H1-H6)
- ✅ Alt text descriptivo en imágenes
- ✅ URLs limpias y descriptivas
- ✅ Sitemap.xml (generar con herramienta online)

---

## 🔧 Mantenimiento

### Actualizar Productos

1. Editar `js/products.js`
2. Añadir/modificar productos en `productCatalog`
3. Añadir imagen en `images/products/`
4. Commit y push

### Actualizar Blog

**El sistema de blog está completamente documentado:**

1. Duplicar `blog-post.html` con nombre descriptivo
2. Seguir las instrucciones en los comentarios `✏️ EDITAR:`
3. Modificar contenido (título, fecha, texto, meta tags)
4. Añadir enlace en `blog.html` (copiar bloque `<article>`)
5. Commit y push

**Ver documentación completa en:**
- Comentarios en `blog.html` (líneas 82-129)
- Comentarios en `blog-post.html` (líneas 2-122)

### Actualizar Textos Legales

Editar archivos en `legal/`:
- `aviso-legal.html`
- `politica-privacidad.html`
- `politica-cookies.html`
- `condiciones-uso.html`

### Ver Formularios Recibidos

1. Supabase Dashboard: https://supabase.com/dashboard
2. Seleccionar proyecto LED Escaparate
3. Table Editor → `form_submissions`
4. Filtrar por `form_type` ('contact' o 'budget')
5. Exportar a CSV si necesario

---

## 🧪 Testing

### Checklist de Pruebas

**Funcionalidad:**
- [ ] Navegación funciona en todas las páginas
- [ ] Simulador calcula correctamente
- [ ] Formularios validan campos
- [ ] Formularios envían a Supabase
- [ ] Redirección a /gracias.html funciona
- [ ] Página 404 se muestra correctamente

**Responsive:**
- [ ] Mobile (320px - 480px)
- [ ] Tablet (768px - 1024px)
- [ ] Desktop (1280px+)

**Navegadores:**
- [ ] Chrome (últimas 2 versiones)
- [ ] Firefox (últimas 2 versiones)
- [ ] Safari (últimas 2 versiones)
- [ ] Edge (últimas 2 versiones)

**SEO:**
- [ ] Meta tags presentes
- [ ] Imágenes con alt text
- [ ] Headings jerárquicos
- [ ] URLs descriptivas

---

## 🐛 Solución de Problemas

### El simulador no calcula

**Problema:** El simulador no muestra resultados

**Solución:**
1. Verificar que los productos tengan `dimensions` en `js/products.js`
2. Abrir consola del navegador (F12) y buscar errores
3. Verificar que `simulator.js` esté cargando correctamente

### Los formularios no envían

**Problema:** Formularios no llegan a Supabase

**Solución:**
1. Verificar que Supabase client esté cargado: abrir consola y buscar "Supabase client initialized"
2. Verificar RLS en Supabase: debe estar desactivado para `form_submissions`
3. Verificar que el sitio esté desplegado en Cloudflare Pages
4. Revisar Supabase Dashboard → Table Editor → `form_submissions`
5. Revisar consola del navegador para errores de JavaScript

### Las imágenes no se muestran

**Problema:** Imágenes de productos no cargan

**Solución:**
1. Verificar rutas en `js/products.js`
2. Verificar que archivos existan en `images/products/`
3. Verificar nombres de archivo (case-sensitive)
4. El sistema mostrará placeholders si no encuentra imágenes

### Error 404 en páginas legales

**Problema:** Enlaces a páginas legales dan error

**Solución:**
1. Verificar que archivos existan en `legal/`
2. Verificar rutas relativas en enlaces
3. En páginas dentro de `legal/`, usar rutas relativas correctas

---

## 📈 Analíticas

### Google Analytics (Futuro)

Para añadir Google Analytics:

1. Crear propiedad en Google Analytics
2. Obtener ID de medición (G-XXXXXXXXXX)
3. Añadir script en `<head>` de todas las páginas:

```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

4. Actualizar Política de Cookies
5. Añadir banner de consentimiento

---

##  Licencia

© 2025 LED Escaparate. Todos los derechos reservados.

Este proyecto es propiedad de LED Escaparate y está protegido por las leyes de propiedad intelectual españolas.

---

## 📝 Changelog

### Versión 2.15.0 (Diciembre 2024)

#### Añadido
- ✅ **Optimización Completa UX Móvil**
  * Padding global reducido: container 24px → 12px en móvil
  * Espaciado vertical optimizado: 48px → 40px en móvil
  * Hero section con altura automática para mejor adaptación
  * Grids optimizados: 2 columnas en tablets, 1 columna en móviles
  * Padding navegación reducido: 24px → 16px en móvil
- ✅ **Productos Homepage Optimizados**
  * 2 productos destacados en móvil (vs 3 en desktop)
  * Especificaciones compactas en móvil (solo Medidas y Consumo)
  * Mejor uso del espacio horizontal en pantallas pequeñas
- ✅ **Botones Hero Mejorados**
  * Botón secundario con colores invertidos (fondo blanco, texto azul)
  * Hover: fondo azul, texto blanco (sin borde)
  * Layout horizontal en todas las pantallas (desktop y móvil)
  * Botones simétricos con altura idéntica
  * Padding reducido en móvil: 0.5rem vertical
  * Ancho completo con max-width para mejor balance visual
- ✅ **H1 Hero Optimizado**
  * Centrado con text-align: center
  * Ancho específico 1100px en desktop (2 líneas)
  * Responsive en móvil con márgenes automáticos
  * Resto del contenido mantiene 700px de ancho
- ✅ **Botones Simulador Optimizados**
  * Texto centrado en botones de navegación (Cómo funciona, Ejemplos, FAQ)
  * Padding reducido: 0.5rem vertical para ahorrar espacio
  * Mejor uso del espacio vertical en móvil

#### Modificado
- 🔄 Eliminado `text-align: justify` de `simulador.html` (19 instancias)
  * Secciones afectadas: "Cómo usar el simulador" (5), "Ventajas" (6), "FAQ" (8)
  * Mejora significativa de legibilidad en móvil
  * Espaciado uniforme entre palabras
- 🔄 Todos los botones ahora tienen `text-align: center` garantizado
- 🔄 Layout consistente de botones hero en todas las pantallas

#### Corregido
- 🐛 H1 cortado en móvil por márgenes negativos
- 🐛 Botones hero con alturas asimétricas (borde de 2px)
- 🐛 Espacios irregulares en textos justificados
- 🐛 Desperdicio de espacio vertical en móvil

---

### Versión 2.14.0 (Diciembre 2024)

#### Añadido
- ✅ **Controles Unificados del Simulador**
  * Sección única "Controles y Ajustes" con grid 3×2
  * Fila 1: Separación | Filas | Modo noche
  * Fila 2: Subir foto (2 cols) | Restablecer (1 col)
  * Botones +/- para Separación y Filas con hold-to-repeat
  * Alineación bottom consistente en ambas filas
- ✅ **Botones de Navegación Rápida**
  * 3 botones debajo de "Calcular": Cómo funciona, Ejemplos, FAQ
  * Enlaces directos a secciones con smooth scroll
  * Grid 3 columnas con hover azul tintado
- ✅ **Mobile Responsive Completo**
  * Tablet (≤768px): Grid 2 columnas landscape
  * Mobile (≤480px): Stack vertical portrait + mensaje rotación
  * Prompt animado "Mejor experiencia en horizontal"
  * Touch targets optimizados (48px altura)
  * Sin overlap de controles en portrait
- ✅ **Contenido AI-Optimized (GEO/AIO)**
  * Bloque semántico oculto con specs técnicas
  * 10 menciones geográficas: Valencia, Catarroja, Albal, Torrent, Aldaia, Paterna, Alicante, Denia, Javea, Altea
  * Schema Product con área servida y propiedades técnicas
  * Dimensiones corregidas en HowTo (A4: 24x33/33x24, A3: 33x46/46x33)
  * URLs del HowTo Schema arregladas

#### Modificado
- 🔄 Eliminadas tarjetas de resumen (horizontal/vertical/total)
- 🔄 Interfaz más compacta y limpia
- 🔄 JavaScript optimizado sin referencias a elementos eliminados

#### Corregido
- 🐛 Separación ahora funciona correctamente (lee de gap-value)
- 🐛 Filas actualiza máximo dinámicamente al cambiar producto
- 🐛 Controles alineados por bottom en ambas filas
- 🐛 Sin superposición en mobile portrait

---

### Versión 2.13.0 (Diciembre 2024)

#### Añadido
- ✅ **Post Estratégico: 5 Ideas para Escaparates Inmobiliarios** (10 Dic 2025)
  * Etiquetas `<dfn>` semánticas: 6000K, PMMA Óptico, Cierre Magnético
  * Schema híbrido (Article + FAQPage) con 5 estrategias y 3 FAQs
  * Pack Superventas CTA con auto-fill de cantidad (12 carpetas)
  * Sección FAQ con diseño de simulador (fondo gris, tarjetas blancas)
- ✅ **Post Técnico: Manual de Instalación de Carpetas LED** (12 Dic 2025)
  * HowTo Schema con 4 pasos técnicos detallados
  * Contenido exhaustivo: herramientas, diagrama 12V, troubleshooting
  * Elementos visuales: cajas PRO (verde), advertencias (rojo)
  * Menciones GEO: Madrid, Barcelona, Valencia
- ✅ **Funcionalidad Auto-Fill Pack Superventas**
  * Botón guarda `packQuantity: "12"` en localStorage
  * Campo `quote-quantity` se rellena automáticamente
  * Mensaje de confirmación: "Pack Superventas Inmobiliaria seleccionado"
  * Integrado en `js/supabase-forms.js`

#### Modificado
- 🔄 Blog index actualizado con 2 nuevos posts
- 🔄 Post placeholder "Guía de instalación" reemplazado por contenido real
- 🔄 Navegación entre artículos actualizada

#### Corregido
- 🐛 Texto blanco en botones CTA para visibilidad
- 🐛 Listas numeradas sin círculos azules en sub-items

---

### Versión 2.7.0 (Diciembre 2024)

#### Añadido
- ✅ **Efectos hover sutiles en botones blancos**: Nueva clase `.btn-white` en CSS
  * Mantiene estética original (fondo blanco, texto azul)
  * Añade elevación de 2px y sombra mejorada en hover
  * Aplicado a 4 botones CTA en index, simulador, blog y nosotros
- ✅ **Transferencia de datos simulador → presupuesto**: Funcionalidad restaurada
  * Datos del simulador se cargan automáticamente en formulario de presupuesto
  * Mensaje de confirmación visual con detalles de configuración
  * Limpieza automática de localStorage después de cargar

#### Modificado
- 🔄 Reemplazados estilos inline por clase `.btn-white` para consistencia
- 🔄 Mejorada UX con feedback visual en botones CTA

---

### Versión 2.6.0 (Diciembre 2024)

#### Añadido
- ✅ **Página Nosotros**: Página corporativa con schema AboutPage
  * Filosofía: Economización y Ecología
  * Honestidad Técnica: Tablas comparativas PMMA vs Poliestireno y Drivers 12V vs 220V
  * Cobertura Nacional: Producto/soporte nacional, montaje en Valencia
  * Tono técnico/profesional orientado a beneficios del cliente
- ✅ **Geo-semántica en blog**: Menciones naturales de Málaga, Alicante, Madrid, Sevilla, Barcelona, Bilbao
- ✅ **Navegación actualizada**: Enlace "Nosotros" en 16 archivos HTML

#### Modificado
- 🔄 Jerarquía visual mejorada (h3 → h4 en subtítulos de tablas)
- 🔄 Widget WhatsApp con estilo Soft Green consistente

---

### Version 2.5.0 (2025-12-04) - Estrategia GEO Avanzada

#### Añadido
- ✅ **Micro-targeting geográfico**: 29 ubicaciones en schema LocalBusiness con Wikipedia
- ✅ **AggregateRating**: 4.9/5 estrellas (118 reseñas) para Rich Snippets
- ✅ **Schema DefinedTermSet**: Glosario técnico de 10 términos especializados
- ✅ **Blog post comparativo 2025**: "Mejores Sistemas Iluminación" con Schema ItemList
- ✅ **Contenido semántico oculto**: Bloques estructurados en productos, index y presupuesto
- ✅ **Tablas comparativas**: Especificaciones técnicas y comparativas de sistemas
- ✅ **Clases CSS reutilizables**: `.table-corporate` para tablas con estética azul corporativa
- ✅ **Schema HowTo**: Guía de instalación paso a paso
- ✅ **Schema WebApplication**: Simulador definido como aplicación de software gratuita
- ✅ **Wikipedia Anchoring**: 9 conceptos clave anclados (Real Estate, Escaparatismo, LED, PMMA...)
- ✅ **Datos Eco**: Eficiencia energética A++ (12-16W) en schema Product
- ✅ **Garantía estructurada**: 2 años de reposición total en schema Product

#### Modificado
- 🔄 Refactorizadas tablas de blog para usar clases CSS en lugar de estilos inline
- 🔄 Actualizado README con sección completa de estrategia GEO
- 🔄 Colores de cabeceras de tabla de verde a azul corporativo
- 🔄 Estructura de blog posts para seguir patrón estándar con tags y sección destacada

### Version 2.4.0 (2024-11-25) - Widget WhatsApp y Optimizaciones:**
- ✅ **Widget flotante de WhatsApp** con estética Soft Green implementado
- ✅ Diseño responsivo: pill-shaped en desktop, circular en móvil
- ✅ Etiquetas semánticas para AIO (`<aside role="complementary">`)
- ✅ Presente en 5 páginas principales (index, productos, simulador, contacto, presupuesto)
- ✅ Mensaje pre-rellenado para mejor conversión

Ver [CHANGELOG.md](CHANGELOG.md) para historial completo de versiones anteriores.

---

## 🙏 Agradecimientos

- **Tipografía:** [Inter](https://rsms.me/inter/) por Rasmus Andersson
- **Hosting:** [Cloudflare Pages](https://pages.cloudflare.com/)
- **Backend:** [Supabase](https://supabase.com/)
- **Repositorio:** [GitHub](https://github.com/)
- **Iconos:** Diseñados internamente

---

**Desarrollado con ❤️ en Valencia, España**

*LED Escaparate - Iluminando el futuro de los escaparates inmobiliarios*
