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
            width: 21,  // cm
            height: 29.7  // cm
        },
        image: 'images/products/a4-vertical.jpg',
        description: 'Carpeta retroiluminada LED formato A4 en orientación vertical. Ideal para escaparates de inmobiliarias.',
        usage: 'Escaparates inmobiliarios, agencias, oficinas',
        specs: {
            lighting: 'LED perimetral blanco frío',
            material: 'Aluminio y metacrilato',
            consumption: '12W',
            installation: 'Suspendida por cables'
        },
        featured: true
    },
    {
        id: 'led-a4-horizontal',
        name: 'Carpeta LED A4 Horizontal',
        dimensions: {
            width: 29.7,  // cm
            height: 21  // cm
        },
        image: 'images/products/a4-horizontal.jpg',
        description: 'Carpeta retroiluminada LED formato A4 en orientación horizontal. Perfecta para fichas de inmuebles.',
        usage: 'Escaparates inmobiliarios, puntos de venta',
        specs: {
            lighting: 'LED perimetral blanco frío',
            material: 'Aluminio y metacrilato',
            consumption: '12W',
            installation: 'Suspendida por cables'
        },
        featured: true
    },
    {
        id: 'led-a3-vertical',
        name: 'Carpeta LED A3 Vertical',
        dimensions: {
            width: 29.7,  // cm
            height: 42  // cm
        },
        image: 'images/products/a3-vertical.jpg',
        description: 'Carpeta retroiluminada LED formato A3 en orientación vertical. Mayor impacto visual para inmuebles destacados.',
        usage: 'Escaparates premium, inmuebles destacados',
        specs: {
            lighting: 'LED perimetral blanco frío',
            material: 'Aluminio y metacrilato',
            consumption: '18W',
            installation: 'Suspendida por cables'
        },
        featured: true
    },
    {
        id: 'led-a3-horizontal',
        name: 'Carpeta LED A3 Horizontal',
        dimensions: {
            width: 42,  // cm
            height: 29.7  // cm
        },
        image: 'images/products/a3-horizontal.jpg',
        description: 'Carpeta retroiluminada LED formato A3 en orientación horizontal. Máxima visibilidad nocturna.',
        usage: 'Escaparates principales, zonas premium',
        specs: {
            lighting: 'LED perimetral blanco frío',
            material: 'Aluminio y metacrilato',
            consumption: '18W',
            installation: 'Suspendida por cables'
        },
        featured: false
    }
    // Añadir más productos aquí según sea necesario
];

// ========================================
// Funciones de Renderizado de Productos
// ========================================

/**
 * Render a single product card
 */
function renderProductCard(product) {
    return `
    <div class="product-card" data-product-id="${product.id}">
      <img src="${product.image}" alt="${product.name}" class="product-image" onerror="this.src='images/products/placeholder.jpg'">
      <div class="product-content">
        <h3 class="product-title">${product.name}</h3>
        <p class="product-description">${product.description}</p>
        
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
        
        <button class="btn btn-primary btn-block" onclick="addToQuote('${product.id}')">
          Incluir en presupuesto
        </button>
      </div>
    </div>
  `;
}

/**
 * Render all products in a grid
 */
function renderProductGrid(containerId, filterFeatured = false) {
    const container = document.getElementById(containerId);
    if (!container) return;

    let products = productCatalog;
    if (filterFeatured) {
        products = products.filter(p => p.featured);
    }

    container.innerHTML = products.map(product => renderProductCard(product)).join('');
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
});

// Exportar funciones para uso global
window.productManager = {
    getAllProducts,
    getProductById,
    addToQuote,
    populateProductSelector,
    renderProductGrid
};
