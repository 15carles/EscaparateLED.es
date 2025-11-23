# Carpetas LED - Website Documentation

## 📋 Descripción del Proyecto

Sitio web profesional para la venta de carpetas retroiluminadas LED destinadas a escaparates de inmobiliarias en España. Desarrollado con HTML5, CSS3 y JavaScript vanilla para máxima compatibilidad y facilidad de despliegue.

## 🚀 Características Principales

- ✅ Diseño responsive y mobile-first
- ✅ Simulador interactivo de escaparates
- ✅ Sistema de gestión de productos modular
- ✅ Formularios con validación client-side
- ✅ Optimización SEO para España (Valencia, Madrid, Barcelona, Alicante)
- ✅ Cumplimiento RGPD/LOPDGDD
- ✅ Banner de consentimiento de cookies
- ✅ Páginas legales completas

## 📁 Estructura del Proyecto

```
carpetas-led/
├── index.html              # Página principal
├── productos.html          # Catálogo de productos
├── simulador.html          # Simulador de escaparate
├── presupuesto.html        # Formulario de presupuesto
├── contacto.html           # Página de contacto
├── blog.html               # Listado de blog
├── blog-post.html          # Plantilla de artículo
├── css/
│   ├── main.css           # Estilos principales
│   └── simulator.css      # Estilos del simulador
├── js/
│   ├── main.js            # JavaScript principal
│   ├── products.js        # Gestión de productos
│   ├── simulator.js       # Lógica del simulador
│   └── forms.js           # Manejo de formularios
├── images/
│   ├── products/          # Imágenes de productos
│   └── icons/             # Iconos SVG
└── legal/
    ├── aviso-legal.html
    ├── politica-privacidad.html
    └── politica-cookies.html
```

## 🛠️ Configuración Inicial

### 1. Datos de la Empresa

Edita los siguientes archivos y reemplaza los placeholders:

**En todas las páginas legales (`legal/*.html`):**
- `[NOMBRE DE LA EMPRESA]` → Tu nombre comercial
- `[NÚMERO DE IDENTIFICACIÓN FISCAL]` → Tu NIF/CIF
- `[DIRECCIÓN COMPLETA]` → Tu dirección fiscal
- `[CIUDAD]` → Tu ciudad para jurisdicción
- `[DATOS DE INSCRIPCIÓN]` → Datos del Registro Mercantil

**En todas las páginas HTML:**
- Actualiza el teléfono: `+34 666 666 666`
- Actualiza el email: `info@carpetasled.es`

### 2. Añadir Productos

Los productos se gestionan en `js/products.js`. Para añadir un nuevo producto:

```javascript
{
  id: 'id-unico-producto',
  name: 'Nombre del Producto',
  dimensions: {
    width: 21,    // Ancho en cm
    height: 29.7  // Alto en cm
  },
  image: 'images/products/nombre-imagen.jpg',
  description: 'Descripción del producto',
  usage: 'Uso recomendado',
  specs: {
    lighting: 'Tipo de iluminación',
    material: 'Material',
    consumption: 'Consumo en W',
    installation: 'Sistema de instalación'
  },
  featured: true  // true para mostrar en homepage
}
```

### 3. Configurar Email de Presupuestos

El formulario de presupuesto está preparado para enviar datos a un backend. Opciones:

#### Opción A: PHP Simple
Crea un archivo `send-email.php`:

```php
<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $data = json_decode(file_get_contents('php://input'), true);
    
    $to = "tu@email.com";
    $subject = "Nueva solicitud de presupuesto - Carpetas LED";
    $message = "Empresa: " . $data['company'] . "\n";
    $message .= "Contacto: " . $data['contact'] . "\n";
    $message .= "Email: " . $data['email'] . "\n";
    // ... añade más campos
    
    $headers = "From: noreply@tupagina.com";
    
    if (mail($to, $subject, $message, $headers)) {
        echo json_encode(['success' => true]);
    } else {
        echo json_encode(['success' => false]);
    }
}
?>
```

Luego actualiza `js/forms.js` en la función `submitFormData()`:

```javascript
fetch('/send-email.php', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(data)
})
.then(response => response.json())
.then(result => {
  // Mostrar mensaje de éxito
})
```

#### Opción B: Servicio de Email (FormSpree, EmailJS, etc.)
Puedes usar servicios como FormSpree o EmailJS que no requieren backend.

### 4. Añadir Imágenes

Coloca las imágenes en las siguientes carpetas:

- **Productos:** `images/products/` (nombra los archivos según el ID del producto)
- **Hero:** `images/hero-bg.jpg` (imagen de fondo del hero)
- **Iconos:** `images/icons/` (iconos SVG opcionales)

**Placeholder:** Si no tienes imágenes, el sistema mostrará placeholders automáticamente.

## 🌐 Despliegue

### Hosting Tradicional (cPanel, FTP)

1. Comprime todos los archivos en un ZIP
2. Sube el contenido a la carpeta `public_html` de tu hosting
3. Asegúrate de que el archivo `index.html` esté en la raíz
4. Configura el dominio en tu panel de hosting

### Netlify / Vercel (Recomendado)

1. Crea una cuenta en Netlify o Vercel
2. Conecta tu repositorio Git o arrastra la carpeta del proyecto
3. El sitio se desplegará automáticamente
4. Configura tu dominio personalizado

### GitHub Pages

1. Sube el proyecto a un repositorio de GitHub
2. Ve a Settings → Pages
3. Selecciona la rama `main` y carpeta `/ (root)`
4. Tu sitio estará disponible en `https://tuusuario.github.io/carpetas-led`

## 🎨 Personalización de Estilos

Los colores y estilos se gestionan mediante CSS Custom Properties en `css/main.css`:

```css
:root {
  --color-primary: #0066FF;        /* Color principal */
  --color-secondary: #1a1a2e;      /* Color secundario */
  --color-background: #FFFFFF;     /* Fondo */
  --font-primary: 'Inter', sans-serif;
  /* ... más variables */
}
```

Modifica estas variables para cambiar toda la paleta de colores del sitio.

## 📊 SEO

### Palabras Clave Principales
- carpetas LED escaparate inmobiliaria
- marcos LED escaparate
- escaparates inmobiliarios iluminados
- carpetas retroiluminadas A3 A4

### Ubicaciones Geográficas
- Valencia (principal)
- Madrid
- Barcelona
- Alicante
- Islas (Baleares, Canarias)

### Optimizaciones Implementadas
- Meta tags en todas las páginas
- Estructura semántica HTML5
- Headings jerárquicos (H1-H6)
- Alt text en imágenes
- URLs limpias y descriptivas
- Sitemap.xml (pendiente de generar)

## 🔧 Mantenimiento

### Actualizar Productos
Edita `js/products.js` y añade/modifica productos en el array `productCatalog`.

### Actualizar Blog
1. Duplica `blog-post.html`
2. Modifica el contenido
3. Añade un enlace en `blog.html`

### Actualizar Textos Legales
Edita los archivos en la carpeta `legal/` según necesites.

## 📱 Navegadores Soportados

- Chrome (últimas 2 versiones)
- Firefox (últimas 2 versiones)
- Safari (últimas 2 versiones)
- Edge (últimas 2 versiones)
- Móviles: iOS Safari, Chrome Android

## 🐛 Solución de Problemas

### El simulador no calcula correctamente
- Verifica que los productos tengan dimensiones definidas en `js/products.js`
- Comprueba la consola del navegador para errores

### Los formularios no envían
- Asegúrate de haber configurado el endpoint de email
- Verifica que el servidor soporte PHP o el servicio que uses

### Las imágenes no se muestran
- Verifica que las rutas sean correctas
- Asegúrate de que los archivos existan en `images/products/`
- El sistema mostrará placeholders si las imágenes no existen

## 📞 Soporte

Para dudas o problemas con el código:
- Revisa la consola del navegador (F12)
- Verifica que todos los archivos estén en su lugar
- Comprueba que las rutas sean correctas

## 📄 Licencia

Este proyecto ha sido desarrollado para uso comercial de [NOMBRE DE LA EMPRESA].

## 🔄 Próximas Mejoras Sugeridas

- [ ] Integración con Google Analytics
- [ ] Sistema de gestión de contenidos (CMS)
- [ ] Galería de imágenes de instalaciones
- [ ] Testimonios de clientes
- [ ] Chat en vivo
- [ ] Versión multiidioma (catalán, inglés)
- [ ] Calculadora de precios en tiempo real
- [ ] Sistema de pedidos online

---

**Desarrollado con ❤️ para el sector inmobiliario español**
