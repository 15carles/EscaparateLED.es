/**
 * CARPETAS LED - Product Data Management
  * Catálogo centralizado de productos y renderizado
 */

// ========================================
// Estructura de Datos de Productos
// ========================================
const productCatalog = [
    {
        id: 'led-a4-vertical',
        name: 'Carpeta LED A4 Vertical',
        dimensions: {
            width: 24,  // cm - A4 vertical: más alto que ancho
            height: 33  // cm
        },
        image: 'images/products/a4-vertical.webp',
        description: 'Carpeta retroiluminada LED formato A4 en orientación vertical. Ideal para escaparates de inmobiliarias.',
        usage: 'Escaparates inmobiliarios, agencias, oficinas',
        specs: {
            lighting: 'LED perimetral blanco frío 10.000K',
            material: 'Metacrilato Termoplástico',
            consumption: '12W',
            installation: 'Suspendida por cables'
        },
        featured: true
    },
    {
        id: 'led-a4-horizontal',
        name: 'Carpeta LED A4 Horizontal',
        dimensions: {
            width: 33,  // cm - A4 horizontal: más ancho que alto
            height: 24  // cm
        },
        image: 'images/products/a4-horizontal.webp',
        description: 'Carpeta retroiluminada LED formato A4 en orientación horizontal. Perfecta para fichas de inmuebles.',
        usage: 'Escaparates inmobiliarios, puntos de venta',
        specs: {
            lighting: 'LED perimetral blanco frío 10.000K',
            material: 'Metacrilato Termoplástico',
            consumption: '12W',
            installation: 'Suspendida por cables'
        },
        featured: true
    },
    {
        id: 'led-a3-vertical',
        name: 'Carpeta LED A3 Vertical',
        dimensions: {
            width: 33,  // cm - A3 vertical: más alto que ancho
            height: 46  // cm
        },
        image: 'images/products/a3-vertical-1.webp',
        description: 'Carpeta retroiluminada LED formato A3 en orientación vertical. Mayor impacto visual para inmuebles destacados.',
        usage: 'Escaparates premium, inmuebles destacados',
        specs: {
            lighting: 'LED perimetral blanco frío 10.000K',
            material: 'Metacrilato Termoplástico',
            consumption: '16W',
            installation: 'Suspendida por cables'
        },
        featured: true
    },
    {
        id: 'led-a3-horizontal',
        name: 'Carpeta LED A3 Horizontal',
        dimensions: {
            width: 46,  // cm - A3 horizontal: más ancho que alto
            height: 33  // cm
        },
        image: 'images/products/a3-horizontal-1.webp',
        description: 'Carpeta retroiluminada LED formato A3 en orientación horizontal. Máxima visibilidad nocturna.',
        usage: 'Escaparates principales, zonas premium',
        specs: {
            lighting: 'LED perimetral blanco frío 10.000K',
            material: 'Metacrilato Termoplástico',
            consumption: '16W',
            installation: 'Suspendida por cables'
        },
        featured: false
    }
    // Añadir más productos aquí según sea necesario
];

// ========================================
// Funciones de Utilidad
// ========================================

/**
 * Obtener array de imágenes para un producto
 * Convención de nombres compartidos:
 * - Imagen 1: Específica del producto (ej: a4-vertical-1.webp)
 * - Imagen 2: Compartida por formato+orientación (ej: a3-y-a4-vertical.webp)
 * - Imagen 3: Compartida por TODOS los productos (a3-y-a4-vertical-y-horizontal.webp)
 */
function getProductImages(product) {
    // Si el producto ya tiene un array de imágenes, usarlo
    if (product.images && Array.isArray(product.images)) {
        return product.images;
    }

    const baseId = product.id.replace('led-', ''); // a4-vertical, a3-horizontal, etc.
    const images = [];

    // Imagen 1: Específica del producto
    images.push(`images/products/${baseId}-1.webp`);

    // Imagen 2: Compartida por formato + orientación
    // Determinar si es vertical u horizontal
    const isVertical = baseId.includes('vertical');
    const orientation = isVertical ? 'vertical' : 'horizontal';
    images.push(`images/products/a3-y-a4-${orientation}.webp`);

    // Imagen 3: Compartida por TODOS los productos
    images.push(`images/products/a3-y-a4-vertical-y-horizontal.webp`);

    return images;
}

// ========================================
// Funciones de Renderizado de Productos
// ========================================

/**
 * Renderizar galería de imágenes del producto
 */
function renderProductGallery(product) {
    const images = getProductImages(product);
    const isSingleImage = images.length === 1;

    const imagesHTML = images.map((img, index) =>
        `<img src="${img}" 
              alt="${product.name} - Imagen ${index + 1}" 
              class="gallery-image ${index === 0 ? 'active' : ''}"
              onerror="this.src='images/products/placeholder.webp'">`
    ).join('');

    const indicatorsHTML = images.map((_, index) =>
        `<button class="indicator ${index === 0 ? 'active' : ''}" 
                 data-index="${index}" 
                 aria-label="Ver imagen ${index + 1}"></button>`
    ).join('');

    return `
        <div class="product-gallery ${isSingleImage ? 'single-image' : ''}" 
             data-product-id="${product.id}">
            <div class="gallery-images">
                ${imagesHTML}
            </div>
            
            ${!isSingleImage ? `
                <button class="gallery-nav gallery-prev" aria-label="Imagen anterior">
                    ‹
                </button>
                <button class="gallery-nav gallery-next" aria-label="Imagen siguiente">
                    ›
                </button>
                
                <div class="gallery-indicators">
                    ${indicatorsHTML}
                </div>
            ` : ''}
        </div>
    `;
}


/**
 * Render a single product card
 * @param {Object} product - Product object
 * @param {boolean} compact - If true, show only essential specs (for mobile)
 */
function renderProductCard(product, compact = false) {
    // En modo compacto (móvil), solo mostrar medidas y consumo
    const specsHTML = compact ? `
        <ul class="product-specs">
          <li>
            <span class="spec-label">Medidas:</span>
            <span class="spec-value">${product.dimensions.width} x ${product.dimensions.height} cm</span>
          </li>
          <li>
            <span class="spec-label">Consumo:</span>
            <span class="spec-value">${product.specs.consumption}</span>
          </li>
        </ul>
    ` : `
        <ul class="product-specs">
          <li>
            <span class="spec-label">Medidas:</span>
            <span class="spec-value">${product.dimensions.width} x ${product.dimensions.height} cm</span>
          </li>
          <li>
            <span class="spec-label">Iluminación:</span>
            <span class="spec-value">${product.specs.lighting}</span>
          </li>
          <li>
            <span class="spec-label">Material:</span>
            <span class="spec-value">${product.specs.material}</span>
          </li>
          <li>
            <span class="spec-label">Consumo:</span>
            <span class="spec-value">${product.specs.consumption}</span>
          </li>
          <li>
            <span class="spec-label">Instalación:</span>
            <span class="spec-value">${product.specs.installation}</span>
          </li>
          <li>
            <span class="spec-label">Uso recomendado:</span>
            <span class="spec-value">${product.usage}</span>
          </li>
        </ul>
    `;

    return `
    <div class="product-card" data-product-id="${product.id}">
      ${renderProductGallery(product)}
      <div class="product-content">
        <h3 class="product-title">${product.name}</h3>
        <p class="product-description">${product.description}</p>
        
        ${specsHTML}
        
        <button class="btn btn-primary btn-block" onclick="addToQuote('${product.id}')">
          Incluir en presupuesto
        </button>
      </div>
    </div>
  `;
}

/**
 * Render all products in a grid
 * @param {string} containerId - ID of the container element
 * @param {boolean} filterFeatured - If true, only show featured products
 */
function renderProductGrid(containerId, filterFeatured = false) {
    const container = document.getElementById(containerId);
    if (!container) return;

    let products = productCatalog;
    if (filterFeatured) {
        products = products.filter(p => p.featured);

        // En móvil, limitar a 2 productos destacados (desktop muestra los 3)
        if (window.innerWidth <= 768) {
            products = products.slice(0, 2);
        }
        // Desktop: muestra todos los productos featured (3)
    }

    // Determinar si usar modo compacto (móvil)
    const isMobile = window.innerWidth <= 768;
    const useCompact = isMobile && filterFeatured;

    container.innerHTML = products.map(product => renderProductCard(product, useCompact)).join('');
}

/**
 * Get product by ID
 */
function getProductById(productId) {
    return productCatalog.find(p => p.id === productId);
}

/**
 * Get all products
 */
function getAllProducts() {
    return productCatalog;
}

/**
 * Add product to quote (stores in localStorage)
 */
function addToQuote(productId) {
    const product = getProductById(productId);
    if (!product) return;

    // Almacenar producto seleccionado en localStorage
    localStorage.setItem('selectedProduct', JSON.stringify({
        id: product.id,
        name: product.name,
        dimensions: product.dimensions
    }));

    // Redirigir al formulario de presupuesto
    window.location.href = 'presupuesto.html';
}

/**
 * Populate product selector (for forms and simulator)
 */
function populateProductSelector(selectElementId) {
    const select = document.getElementById(selectElementId);
    if (!select) return;

    // Limpiar opciones existentes excepto la primera (placeholder)
    const firstOption = select.options[0];
    select.innerHTML = '';
    if (firstOption) {
        select.appendChild(firstOption);
    }

    // Añadir opciones de productos
    productCatalog.forEach(product => {
        const option = document.createElement('option');
        option.value = product.id;
        option.textContent = `${product.name} (${product.dimensions.width}x${product.dimensions.height} cm)`;
        option.dataset.width = product.dimensions.width;
        option.dataset.height = product.dimensions.height;
        select.appendChild(option);
    });
}

// ========================================
// Inicializar al cargar la página
// ========================================
document.addEventListener('DOMContentLoaded', function () {
    // Renderizar cuadrículas de productos si existen los contenedores
    renderProductGrid('products-grid-all', false);
    renderProductGrid('products-grid-featured', true);

    // Rellenar selectores de productos
    populateProductSelector('product-selector');
    populateProductSelector('quote-product-selector');

    // Inicializar galerías después de renderizar productos
    initializeGalleries();
});

// Exportar funciones para uso global
window.productManager = {
    getAllProducts,
    getProductById,
    addToQuote,
    populateProductSelector,
    renderProductGrid
};
/**
 * Inicializar galerías de productos con navegación
 */
function initializeGalleries() {
    document.querySelectorAll('.product-gallery').forEach(gallery => {
        const images = gallery.querySelectorAll('.gallery-image');
        const indicators = gallery.querySelectorAll('.indicator');
        const prevBtn = gallery.querySelector('.gallery-prev');
        const nextBtn = gallery.querySelector('.gallery-next');

        if (images.length <= 1) return;

        let currentIndex = 0;

        function showImage(index) {
            images.forEach(img => img.classList.remove('active'));
            indicators.forEach(ind => ind.classList.remove('active'));

            images[index].classList.add('active');
            indicators[index].classList.add('active');
            currentIndex = index;
        }

        // Navegación con flechas
        prevBtn?.addEventListener('click', (e) => {
            e.preventDefault();
            const newIndex = (currentIndex - 1 + images.length) % images.length;
            showImage(newIndex);
        });

        nextBtn?.addEventListener('click', (e) => {
            e.preventDefault();
            const newIndex = (currentIndex + 1) % images.length;
            showImage(newIndex);
        });

        // Navegación con indicadores
        indicators.forEach((indicator, index) => {
            indicator.addEventListener('click', (e) => {
                e.preventDefault();
                showImage(index);
            });
        });

        // Navegación con teclado (accesibilidad)
        gallery.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') {
                prevBtn?.click();
            } else if (e.key === 'ArrowRight') {
                nextBtn?.click();
            }
        });
    });
}
