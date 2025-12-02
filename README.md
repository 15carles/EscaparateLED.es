# 🌟 LED Escaparate - Website

[![Version](https://img.shields.io/badge/version-2.2.0-blue.svg)](https://github.com/15carles/EscaparateLED.es)
[![License](https://img.shields.io/badge/license-Proprietary-red.svg)](LICENSE)

> Sitio web profesional para LED Escaparate - Especialistas en carpetas retroiluminadas LED para escaparates inmobiliarios en toda España.

**🌐 Sitio web:** [https://ledescaparate.es](https://ledescaparate.es)

---

## 📋 Descripción del Proyecto

Plataforma web completa para la promoción y venta de carpetas retroiluminadas LED destinadas a escaparates de inmobiliarias, agencias, clínicas y comercios especializados en España. Desarrollado con tecnologías web modernas (HTML5, CSS3, JavaScript vanilla) para máxima compatibilidad, rendimiento y facilidad de mantenimiento.

### 🎯 Objetivos del Sitio

- Mostrar catálogo de productos LED profesionales
- Proporcionar simulador interactivo de escaparates
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
- ✅ **Simulador interactivo** de escaparates con cálculo automático
- ✅ **Sistema de productos modular** fácilmente actualizable
- ✅ **Formularios inteligentes** con validación client-side
- ✅ **Integración Supabase** para gestión de formularios
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
- ✅ Estructura semántica HTML5
- ✅ Caché optimizado para assets estáticos
- ✅ Imágenes optimizadas y lazy loading
- ✅ GEO optimizado para la navegación de agentes IA por la web

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
│   ├── simulator.js          # Lógica del simulador
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
├── VERSION                   # Versión actual (2.2.0)
└── README.md                 # Este archivo
```

---

## 🚀 Inicio Rápido

### Requisitos Previos

- Navegador web moderno
- Editor de código (VS Code recomendado)
- Git (para control de versiones)
- Cuenta en Netlify (para despliegue)

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
    width: 29.7,
    height: 42
  },
  image: 'images/products/a3-vertical-simple.jpg',
  description: 'Carpeta LED A3 vertical con iluminación simple',
  usage: 'Ideal para escaparates estándar',
  specs: {
    lighting: 'LED blanco frío 6500K',
    material: 'Acrílico transparente 3mm',
    consumption: '12W',
    installation: 'Adhesivo 3M incluido'
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
- Cliente Supabase cargado desde CDN: `@supabase/supabase-js@2`
- Tabla destino: `public.form_submissions`
- Validación client-side de campos obligatorios
- Redirección a `/gracias.html` tras envío exitoso

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

### 4. Configuración de Netlify

El archivo `netlify.toml` incluye:

```toml
# Redirecciones
[[redirects]]
  from = "/404"
  to = "/404.html"
  status = 404

# Headers de seguridad
[[headers]]
  for = "/*"
  [headers.values]
    X-Frame-Options = "DENY"
    X-Content-Type-Options = "nosniff"
    X-XSS-Protection = "1; mode=block"
    Referrer-Policy = "strict-origin-when-cross-origin"

# Caché para assets
[[headers]]
  for = "/css/*"
  [headers.values]
    Cache-Control = "public, max-age=31536000"
```

---

## 🌐 Despliegue

### Netlify (Recomendado - Actual)

**Despliegue automático configurado:**

1. Push a GitHub → Deploy automático
2. URL: https://ledescaparate.es
3. SSL automático
4. Formularios gestionados

**Comandos útiles:**

```bash
# Ver estado del deploy
netlify status

# Deploy manual
netlify deploy --prod

# Ver logs
netlify logs
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

- carpetas LED escaparate
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

1. Netlify Dashboard
2. Forms → presupuesto / contacto
3. Exportar a CSV si necesario

---

## 🧪 Testing

### Checklist de Pruebas

**Funcionalidad:**
- [ ] Navegación funciona en todas las páginas
- [ ] Simulador calcula correctamente
- [ ] Formularios validan campos
- [ ] Formularios envían a Netlify
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

**Problema:** Formularios no llegan a Netlify

**Solución:**
1. Verificar atributo `data-netlify="true"` en `<form>`
2. Verificar campo oculto `<input type="hidden" name="form-name" value="...">`
3. Verificar que el sitio esté desplegado en Netlify (no funciona en local)
4. Revisar Netlify Dashboard → Forms

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

## 🔄 Changelog

Ver [CHANGELOG.md](CHANGELOG.md) para historial completo de cambios.

### Versión Actual: 2.2.0 (2025-11-25)

**Cambios principales:**
- ✅ Sistema de blog escalable con documentación completa
- ✅ Estrategia híbrida de instalación (Valencia vs Nacional)
- ✅ Campo ubicación en formulario de presupuesto
- ✅ Nuevas FAQs sobre instalación
- ✅ Corrección de estilos en blog-post.html
- ✅ Documentación inline en blog.html y blog-post.html

### Versión 2.1.0 (2025-11-24)

**Cambios:**
- ✅ Actualización completa de textos legales (RGPD/LOPDGDD)
- ✅ Integración Supabase Forms
- ✅ Mejoras de accesibilidad en formularios
- ✅ Campo "Modelo deseado" ahora opcional
- ✅ Corrección de estilos en formulario de presupuesto
- ✅ Cláusulas legales en formularios

---

## 🙏 Agradecimientos

- **Tipografía:** [Inter](https://rsms.me/inter/) por Rasmus Andersson
- **Hosting:** [Netlify](https://www.netlify.com/)
- **Iconos:** Diseñados internamente

---

**Desarrollado con ❤️ en Valencia, España**

*LED Escaparate - Iluminando el futuro de los escaparates inmobiliarios*
