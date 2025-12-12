/**
 * CARPETAS LED - Showcase Simulator V2
 * Calculadora interactiva con sistema de columnas independientes
 * Versión: 2.13.0 - Simulador Híbrido con Modo Noche
 */

// ========================================
// Importar datos de productos
// ========================================
// Se asume que products.js ya está cargado y exporta productCatalog

// ========================================
// Estado del Simulador
// ========================================
let simulatorState = {
    showcaseWidth: 0,
    showcaseHeight: 0,
    columns: [], // Array de objetos: { id, productId, rows, frames }
    totalActiveFrames: 0,
    totalConsumption: 0,
    recommendedPowerSupply: '',
    nightMode: {
        enabled: false,
        backgroundImage: null,
        zoom: 100,
        panX: 0,
        panY: 0
    }
};

const PERIMETER_MARGIN = 15; // cm - Margen perimetral fijo desde los bordes del escaparate
const FRAME_SPACING = 10; // cm - Espaciado entre carpetas

// ========================================
// Funciones de Cálculo - Sistema de Columnas
// ========================================

/**
 * Calcular cuántas columnas caben en el escaparate
 * Retorna el número de columnas basado en el ancho del producto seleccionado
 */
function calculateColumns(showcaseWidth, frameWidth) {
    const usableWidth = showcaseWidth - (PERIMETER_MARGIN * 2);
    const columns = Math.floor((usableWidth + FRAME_SPACING) / (frameWidth + FRAME_SPACING));
    return Math.max(0, columns);
}

/**
 * Calcular cuántas filas caben en una columna específica
 */
function calculateRowsForColumn(showcaseHeight, frameHeight) {
    const usableHeight = showcaseHeight - (PERIMETER_MARGIN * 2);
    const rows = Math.floor((usableHeight + FRAME_SPACING) / (frameHeight + FRAME_SPACING));
    return Math.max(0, rows);
}

/**
 * Inicializar configuración automática
 * Crea todas las columnas con el mismo tipo de carpeta (configuración inicial)
 */
function initializeAutoConfiguration(showcaseWidth, showcaseHeight, productId) {
    const product = window.productManager?.getProductById(productId);
    if (!product) {
        console.error('Producto no encontrado:', productId);
        return null;
    }

    const numColumns = calculateColumns(showcaseWidth, product.dimensions.width);
    const numRows = calculateRowsForColumn(showcaseHeight, product.dimensions.height);

    const columns = [];
    for (let i = 0; i < numColumns; i++) {
        columns.push({
            id: i,
            productId: productId,
            rows: numRows,
            frames: numRows // Inicialmente todas las carpetas activas
        });
    }

    return {
        columns,
        totalColumns: numColumns,
        totalRows: numRows,
        totalFrames: numColumns * numRows
    };
}

/**
 * Actualizar una columna específica con nuevo tipo de carpeta
 */
function updateColumn(columnId, newProductId) {
    const column = simulatorState.columns.find(col => col.id === columnId);
    if (!column) return false;

    if (newProductId === null || newProductId === 'empty') {
        // Columna vacía
        column.productId = null;
        column.rows = 0;
        column.frames = 0;
    } else {
        const product = window.productManager?.getProductById(newProductId);
        if (!product) return false;

        // Recalcular filas para el nuevo producto
        const newRows = calculateRowsForColumn(
            simulatorState.showcaseHeight,
            product.dimensions.height
        );

        column.productId = newProductId;
        column.rows = newRows;
        column.frames = newRows;
    }

    // Recalcular totales
    recalculateTotals();
    return true;
}

/**
 * Recalcular totales y datos técnicos
 */
function recalculateTotals() {
    let totalFrames = 0;
    let totalConsumption = 0;

    simulatorState.columns.forEach(column => {
        if (column.productId && column.frames > 0) {
            totalFrames += column.frames;

            // Obtener consumo del producto
            const product = window.productManager?.getProductById(column.productId);
            if (product && product.specs.consumption) {
                const watts = parseFloat(product.specs.consumption.replace('W', ''));
                totalConsumption += watts * column.frames;
            }
        }
    });

    simulatorState.totalActiveFrames = totalFrames;
    simulatorState.totalConsumption = totalConsumption;
    simulatorState.recommendedPowerSupply = calculatePowerSupply(totalConsumption);

    // Actualizar UI de datos técnicos
    updateTechnicalDataDisplay();
}

/**
 * Calcular fuente de alimentación recomendada
 * Aplica margen de seguridad del 20%
 */
function calculatePowerSupply(totalWatts) {
    const withMargin = totalWatts * 1.2; // 20% de margen

    if (withMargin <= 60) return '60W';
    if (withMargin <= 100) return '100W';
    if (withMargin <= 150) return '150W';
    if (withMargin <= 200) return '200W';
    if (withMargin <= 300) return '300W';
    return 'Personalizada (>300W)';
}

/**
 * Generar desglose de carpetas por tipo
 */
function generateFrameBreakdown() {
    const breakdown = {};

    simulatorState.columns.forEach(column => {
        if (column.productId && column.frames > 0) {
            const product = window.productManager?.getProductById(column.productId);
            if (product) {
                if (!breakdown[product.name]) {
                    breakdown[product.name] = 0;
                }
                breakdown[product.name] += column.frames;
            }
        }
    });

    return breakdown;
}

// ========================================
// Funciones de Renderizado
// ========================================

/**
 * Renderizar grid con sistema de columnas
 */
function renderColumnGrid() {
    const gridContainer = document.getElementById('showcase-grid');
    if (!gridContainer) return;

    gridContainer.innerHTML = '';

    // Configurar grid CSS
    const totalColumns = simulatorState.columns.length;
    if (totalColumns === 0) {
        gridContainer.innerHTML = '<p class="empty-state">Configura el escaparate para ver la vista previa</p>';
        return;
    }

    // Crear contenedor de columnas
    gridContainer.style.display = 'flex';
    gridContainer.style.gap = '8px';
    gridContainer.style.justifyContent = 'center';

    simulatorState.columns.forEach((column, colIndex) => {
        const columnDiv = document.createElement('div');
        columnDiv.className = 'simulator-column';
        columnDiv.dataset.columnId = column.id;
        columnDiv.style.display = 'flex';
        columnDiv.style.flexDirection = 'column';
        columnDiv.style.gap = '8px';
        columnDiv.style.position = 'relative';

        // Selector de columna (desktop) o indicador táctil (mobile)
        const isMobile = window.innerWidth < 768;

        if (!isMobile) {
            // Desktop: selector dropdown
            const selector = createColumnSelector(column);
            columnDiv.appendChild(selector);
        } else {
            // Mobile: hacer columna táctil
            columnDiv.style.cursor = 'pointer';
            columnDiv.addEventListener('click', () => openBottomSheet(column.id));
        }

        // Renderizar carpetas de la columna
        if (column.productId && column.rows > 0) {
            const product = window.productManager?.getProductById(column.productId);
            if (product) {
                const scale = Math.min(600 / (simulatorState.showcaseWidth - PERIMETER_MARGIN * 2),
                    400 / (simulatorState.showcaseHeight - PERIMETER_MARGIN * 2),
                    2);

                for (let row = 0; row < column.rows; row++) {
                    const frameItem = document.createElement('div');
                    frameItem.className = 'frame-item';
                    frameItem.style.width = `${product.dimensions.width * scale}px`;
                    frameItem.style.height = `${product.dimensions.height * scale}px`;
                    frameItem.textContent = `${colIndex + 1}-${row + 1}`;
                    frameItem.dataset.columnId = column.id;
                    frameItem.dataset.row = row;

                    columnDiv.appendChild(frameItem);
                }
            }
        } else {
            // Columna vacía - mostrar placeholder
            const emptyPlaceholder = document.createElement('div');
            emptyPlaceholder.className = 'column-empty-placeholder';
            emptyPlaceholder.textContent = 'Vacío';
            emptyPlaceholder.style.padding = '20px';
            emptyPlaceholder.style.opacity = '0.3';
            columnDiv.appendChild(emptyPlaceholder);
        }

        gridContainer.appendChild(columnDiv);
    });
}

/**
 * Crear selector de columna (desktop)
 */
function createColumnSelector(column) {
    const container = document.createElement('div');
    container.className = 'column-selector';

    const select = document.createElement('select');
    select.className = 'form-select';
    select.setAttribute('aria-label', `Configurar columna ${column.id + 1}`);

    // Opción actual
    const currentProduct = column.productId ?
        window.productManager?.getProductById(column.productId) : null;

    // Opciones disponibles
    const options = [
        { value: 'empty', label: '-- Vacío --' },
        { value: 'led-a4-vertical', label: 'A4 Vertical' },
        { value: 'led-a4-horizontal', label: 'A4 Horizontal' },
        { value: 'led-a3-vertical', label: 'A3 Vertical' },
        { value: 'led-a3-horizontal', label: 'A3 Horizontal' }
    ];

    options.forEach(opt => {
        const option = document.createElement('option');
        option.value = opt.value;
        option.textContent = opt.label;
        if (opt.value === column.productId || (opt.value === 'empty' && !column.productId)) {
            option.selected = true;
        }
        select.appendChild(option);
    });

    select.addEventListener('change', (e) => {
        const newProductId = e.target.value === 'empty' ? null : e.target.value;
        updateColumn(column.id, newProductId);
        renderColumnGrid();
        updateResultsDisplay();
    });

    container.appendChild(select);
    return container;
}

/**
 * Actualizar visualización de resultados
 */
function updateResultsDisplay() {
    // Actualizar tarjetas de resumen
    const breakdown = generateFrameBreakdown();
    const breakdownEntries = Object.entries(breakdown);

    // Mostrar total
    const totalElement = document.getElementById('result-total');
    if (totalElement) {
        totalElement.textContent = simulatorState.totalActiveFrames;
    }

    // Mostrar desglose por tipo (usar las tarjetas existentes de forma dinámica)
    const horizontalElement = document.getElementById('result-horizontal');
    const verticalElement = document.getElementById('result-vertical');

    if (breakdownEntries.length > 0) {
        // Primer tipo
        if (horizontalElement) {
            const [name, count] = breakdownEntries[0];
            horizontalElement.textContent = count;
            horizontalElement.parentElement.querySelector('.result-label').textContent = name;
        }

        // Segundo tipo
        if (breakdownEntries.length > 1 && verticalElement) {
            const [name, count] = breakdownEntries[1];
            verticalElement.textContent = count;
            verticalElement.parentElement.querySelector('.result-label').textContent = name;
        } else if (verticalElement) {
            verticalElement.textContent = '0';
            verticalElement.parentElement.querySelector('.result-label').textContent = 'Otros';
        }
    }

    // Mostrar nombre del producto en grid
    const gridProductName = document.getElementById('grid-product-name');
    if (gridProductName) {
        if (breakdownEntries.length === 1) {
            gridProductName.textContent = breakdownEntries[0][0];
        } else if (breakdownEntries.length > 1) {
            gridProductName.textContent = 'Configuración Mixta';
        } else {
            gridProductName.textContent = '-';
        }
    }
}

/**
 * Actualizar visualización de datos técnicos
 */
function updateTechnicalDataDisplay() {
    const techTotal = document.getElementById('tech-total');
    const techConsumption = document.getElementById('tech-consumption');
    const techPowerSupply = document.getElementById('tech-power-supply');
    const techBreakdown = document.getElementById('tech-breakdown');

    if (techTotal) techTotal.textContent = simulatorState.totalActiveFrames;
    if (techConsumption) techConsumption.textContent = `${simulatorState.totalConsumption.toFixed(1)}W`;
    if (techPowerSupply) techPowerSupply.textContent = simulatorState.recommendedPowerSupply;

    if (techBreakdown) {
        const breakdown = generateFrameBreakdown();
        const breakdownHTML = Object.entries(breakdown)
            .map(([name, count]) => {
                const product = window.productManager?.getAllProducts().find(p => p.name === name);
                const watts = product ? parseFloat(product.specs.consumption.replace('W', '')) : 0;
                const subtotal = watts * count;
                return `<p><strong>${name}:</strong> ${count} unidades × ${watts}W = ${subtotal}W</p>`;
            })
            .join('');
        techBreakdown.innerHTML = breakdownHTML || '<p>No hay carpetas configuradas</p>';
    }
}

// ========================================
// Bottom Sheet (Mobile)
// ========================================

let bottomSheetInstance = null;

/**
 * Abrir bottom sheet para seleccionar tipo de carpeta (mobile)
 */
function openBottomSheet(columnId) {
    const column = simulatorState.columns.find(col => col.id === columnId);
    if (!column) return;

    // Crear bottom sheet si no existe
    if (!bottomSheetInstance) {
        createBottomSheet();
    }

    // Actualizar contenido
    const title = bottomSheetInstance.querySelector('.bottom-sheet-title');
    title.textContent = `Columna ${columnId + 1}`;

    // Marcar opción actual
    const buttons = bottomSheetInstance.querySelectorAll('.bottom-sheet-button');
    buttons.forEach(btn => {
        btn.classList.remove('active');
        if (btn.dataset.productId === column.productId ||
            (btn.dataset.productId === 'empty' && !column.productId)) {
            btn.classList.add('active');
        }

        // Actualizar evento
        btn.onclick = () => {
            const newProductId = btn.dataset.productId === 'empty' ? null : btn.dataset.productId;
            updateColumn(columnId, newProductId);
            renderColumnGrid();
            updateResultsDisplay();
            closeBottomSheet();
        };
    });

    // Mostrar
    bottomSheetInstance.classList.add('active');
    document.body.style.overflow = 'hidden';
}

/**
 * Cerrar bottom sheet
 */
function closeBottomSheet() {
    if (bottomSheetInstance) {
        bottomSheetInstance.classList.remove('active');
        document.body.style.overflow = '';
    }
}

/**
 * Crear estructura del bottom sheet
 */
function createBottomSheet() {
    const sheet = document.createElement('div');
    sheet.className = 'bottom-sheet';
    sheet.innerHTML = `
        <div class="bottom-sheet-overlay"></div>
        <div class="bottom-sheet-content">
            <div class="bottom-sheet-header">
                <h3 class="bottom-sheet-title">Seleccionar Tipo</h3>
                <button class="bottom-sheet-close" aria-label="Cerrar">✕</button>
            </div>
            <div class="bottom-sheet-buttons">
                <button class="bottom-sheet-button btn btn-secondary" data-product-id="empty">
                    🚫 Vacío
                </button>
                <button class="bottom-sheet-button btn btn-primary" data-product-id="led-a4-vertical">
                    📄 A4 Vertical
                </button>
                <button class="bottom-sheet-button btn btn-primary" data-product-id="led-a4-horizontal">
                    📄 A4 Horizontal
                </button>
                <button class="bottom-sheet-button btn btn-primary" data-product-id="led-a3-vertical">
                    📋 A3 Vertical
                </button>
                <button class="bottom-sheet-button btn btn-primary" data-product-id="led-a3-horizontal">
                    📋 A3 Horizontal
                </button>
            </div>
        </div>
    `;

    // Cerrar al hacer clic en overlay o botón cerrar
    sheet.querySelector('.bottom-sheet-overlay').addEventListener('click', closeBottomSheet);
    sheet.querySelector('.bottom-sheet-close').addEventListener('click', closeBottomSheet);

    document.body.appendChild(sheet);
    bottomSheetInstance = sheet;
}

// ========================================
// Modo Noche
// ========================================

/**
 * Activar/desactivar modo noche
 */
function toggleNightMode(enabled) {
    simulatorState.nightMode.enabled = enabled;
    const gridWrapper = document.querySelector('.grid-wrapper');

    if (enabled && gridWrapper) {
        gridWrapper.classList.add('night-mode');
        updateNightModeBackground();
    } else if (gridWrapper) {
        gridWrapper.classList.remove('night-mode');
    }
}

/**
 * Cargar imagen de fondo (client-side)
 */
function loadBackgroundImage(file) {
    if (!file || !file.type.startsWith('image/')) {
        alert('Por favor, selecciona un archivo de imagen válido');
        return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
        simulatorState.nightMode.backgroundImage = e.target.result;
        updateNightModeBackground();
    };
    reader.readAsDataURL(file);
}

/**
 * Actualizar fondo del modo noche
 */
function updateNightModeBackground() {
    const gridWrapper = document.querySelector('.grid-wrapper');
    if (!gridWrapper || !simulatorState.nightMode.enabled) return;

    const { backgroundImage, zoom, panX, panY } = simulatorState.nightMode;

    if (backgroundImage) {
        gridWrapper.style.backgroundImage = `url(${backgroundImage})`;
        gridWrapper.style.backgroundSize = `${zoom}%`;
        gridWrapper.style.backgroundPosition = `${50 + panX}% ${50 + panY}%`;
    }
}

/**
 * Actualizar controles de modo noche
 */
function updateNightModeControls(type, value) {
    switch (type) {
        case 'zoom':
            simulatorState.nightMode.zoom = parseFloat(value);
            break;
        case 'panX':
            simulatorState.nightMode.panX = parseFloat(value);
            break;
        case 'panY':
            simulatorState.nightMode.panY = parseFloat(value);
            break;
    }
    updateNightModeBackground();
}

// ========================================
// Integración Stateless (URL)
// ========================================

/**
 * Codificar configuración en URL
 * Formato: ?cfg=w300h200-c0A4V4-c1A3H3-c2X
 */
function encodeConfiguration() {
    const parts = [
        `w${simulatorState.showcaseWidth}`,
        `h${simulatorState.showcaseHeight}`
    ];

    simulatorState.columns.forEach(col => {
        if (col.productId) {
            const shortId = col.productId
                .replace('led-', '')
                .replace('-vertical', 'V')
                .replace('-horizontal', 'H')
                .replace('a4', 'A4')
                .replace('a3', 'A3');
            parts.push(`c${col.id}${shortId}${col.rows}`);
        } else {
            parts.push(`c${col.id}X`);
        }
    });

    return parts.join('-');
}

/**
 * Decodificar configuración desde URL
 */
function decodeConfiguration(configString) {
    const parts = configString.split('-');
    const config = {
        showcaseWidth: 0,
        showcaseHeight: 0,
        columns: []
    };

    parts.forEach(part => {
        if (part.startsWith('w')) {
            config.showcaseWidth = parseFloat(part.substring(1));
        } else if (part.startsWith('h')) {
            config.showcaseHeight = parseFloat(part.substring(1));
        } else if (part.startsWith('c')) {
            const match = part.match(/c(\d+)([A-Z0-9]+)(\d+)?/);
            if (match) {
                const [, colId, typeCode, rows] = match;
                let productId = null;

                if (typeCode !== 'X') {
                    productId = `led-${typeCode.toLowerCase()
                        .replace('a4v', 'a4-vertical')
                        .replace('a4h', 'a4-horizontal')
                        .replace('a3v', 'a3-vertical')
                        .replace('a3h', 'a3-horizontal')}`;
                }

                config.columns.push({
                    id: parseInt(colId),
                    productId,
                    rows: rows ? parseInt(rows) : 0
                });
            }
        }
    });

    return config;
}

/**
 * Cargar configuración desde URL si existe
 */
function loadConfigurationFromURL() {
    const urlParams = new URLSearchParams(window.location.search);
    const configString = urlParams.get('cfg');

    if (configString) {
        try {
            const config = decodeConfiguration(configString);

            // Rellenar formulario
            document.getElementById('showcase-width').value = config.showcaseWidth;
            document.getElementById('showcase-height').value = config.showcaseHeight;

            // Aplicar configuración
            simulatorState.showcaseWidth = config.showcaseWidth;
            simulatorState.showcaseHeight = config.showcaseHeight;
            simulatorState.columns = config.columns.map(col => ({
                ...col,
                frames: col.rows
            }));

            recalculateTotals();
            renderColumnGrid();
            updateResultsDisplay();

            // Mostrar resultados
            const resultsContainer = document.getElementById('simulator-results');
            if (resultsContainer) {
                resultsContainer.classList.add('active');
            }

            return true;
        } catch (error) {
            console.error('Error al cargar configuración desde URL:', error);
        }
    }

    return false;
}

// ========================================
// Manejadores de Eventos
// ========================================

/**
 * Manejar envío del formulario
 */
function handleSimulatorSubmit(event) {
    event.preventDefault();

    const showcaseWidth = parseFloat(document.getElementById('showcase-width').value);
    const showcaseHeight = parseFloat(document.getElementById('showcase-height').value);
    const productSelect = document.getElementById('product-selector');
    const selectedOption = productSelect.options[productSelect.selectedIndex];

    // Validaciones
    if (!showcaseWidth || showcaseWidth <= 0) {
        alert('Por favor, introduce un ancho válido para el escaparate');
        return;
    }

    if (!showcaseHeight || showcaseHeight <= 0) {
        alert('Por favor, introduce un alto válido para el escaparate');
        return;
    }

    if (!selectedOption.value) {
        alert('Por favor, selecciona un modelo de carpeta');
        return;
    }

    const productId = selectedOption.value;
    const product = window.productManager?.getProductById(productId);

    if (!product) {
        alert('Error al cargar datos del producto');
        return;
    }

    // Verificar tamaño mínimo
    if (showcaseWidth < (product.dimensions.width + PERIMETER_MARGIN * 2) ||
        showcaseHeight < (product.dimensions.height + PERIMETER_MARGIN * 2)) {
        alert(`El escaparate es demasiado pequeño para este modelo. Necesitas al menos ${product.dimensions.width + PERIMETER_MARGIN * 2}cm de ancho y ${product.dimensions.height + PERIMETER_MARGIN * 2}cm de alto (incluyendo márgenes de 15cm).`);
        return;
    }

    // Inicializar configuración automática
    const autoConfig = initializeAutoConfiguration(showcaseWidth, showcaseHeight, productId);

    if (!autoConfig) {
        alert('Error al calcular la configuración');
        return;
    }

    // Actualizar estado
    simulatorState.showcaseWidth = showcaseWidth;
    simulatorState.showcaseHeight = showcaseHeight;
    simulatorState.columns = autoConfig.columns;

    recalculateTotals();
    renderColumnGrid();
    updateResultsDisplay();

    // Mostrar resultados
    const resultsContainer = document.getElementById('simulator-results');
    if (resultsContainer) {
        resultsContainer.classList.add('active');
        resultsContainer.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
}

/**
 * Enviar a formulario de presupuesto
 */
function sendToQuoteForm() {
    if (simulatorState.totalActiveFrames === 0) {
        alert('Por favor, calcula primero la configuración del escaparate');
        return;
    }

    // Generar URL con configuración
    const configString = encodeConfiguration();
    window.location.href = `presupuesto.html?cfg=${configString}`;
}

/**
 * Resetear simulador
 */
function resetSimulator() {
    document.getElementById('simulator-form').reset();

    simulatorState = {
        showcaseWidth: 0,
        showcaseHeight: 0,
        columns: [],
        totalActiveFrames: 0,
        totalConsumption: 0,
        recommendedPowerSupply: '',
        nightMode: {
            enabled: false,
            backgroundImage: null,
            zoom: 100,
            panX: 0,
            panY: 0
        }
    };

    const resultsContainer = document.getElementById('simulator-results');
    if (resultsContainer) {
        resultsContainer.classList.remove('active');
    }

    const gridContainer = document.getElementById('showcase-grid');
    if (gridContainer) {
        gridContainer.innerHTML = '';
    }
}

// ========================================
// Inicialización
// ========================================
document.addEventListener('DOMContentLoaded', function () {
    // Cargar configuración desde URL si existe
    const loadedFromURL = loadConfigurationFromURL();

    // Event listeners del formulario
    const simulatorForm = document.getElementById('simulator-form');
    if (simulatorForm) {
        simulatorForm.addEventListener('submit', handleSimulatorSubmit);
    }

    const quoteButton = document.getElementById('send-to-quote');
    if (quoteButton) {
        quoteButton.addEventListener('click', sendToQuoteForm);
    }

    const resetButton = document.getElementById('reset-simulator');
    if (resetButton) {
        resetButton.addEventListener('click', resetSimulator);
    }

    // Event listeners de modo noche
    const backgroundUpload = document.getElementById('background-upload');
    if (backgroundUpload) {
        backgroundUpload.addEventListener('change', (e) => {
            if (e.target.files && e.target.files[0]) {
                loadBackgroundImage(e.target.files[0]);
            }
        });
    }

    const nightModeToggle = document.getElementById('night-mode-toggle');
    if (nightModeToggle) {
        nightModeToggle.addEventListener('change', (e) => {
            toggleNightMode(e.target.checked);
            // Mostrar/ocultar controles de imagen
            const imageControls = document.getElementById('image-controls');
            if (imageControls) {
                imageControls.style.display = e.target.checked ? 'block' : 'none';
            }
        });
    }

    const zoomControl = document.getElementById('zoom-control');
    if (zoomControl) {
        zoomControl.addEventListener('input', (e) => {
            updateNightModeControls('zoom', e.target.value);
            // Actualizar valor mostrado
            const zoomValue = document.getElementById('zoom-value');
            if (zoomValue) {
                zoomValue.textContent = e.target.value;
            }
        });
    }

    const panXControl = document.getElementById('pan-x');
    if (panXControl) {
        panXControl.addEventListener('input', (e) => {
            updateNightModeControls('panX', e.target.value);
        });
    }

    const panYControl = document.getElementById('pan-y');
    if (panYControl) {
        panYControl.addEventListener('input', (e) => {
            updateNightModeControls('panY', e.target.value);
        });
    }

    // Responsive: recrear grid al cambiar tamaño de ventana
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            if (simulatorState.columns.length > 0) {
                renderColumnGrid();
            }
        }, 250);
    });
});

// Exportar funciones para uso global
window.simulator = {
    getState: () => simulatorState,
    updateColumn,
    sendToQuoteForm,
    resetSimulator,
    encodeConfiguration,
    decodeConfiguration
};
