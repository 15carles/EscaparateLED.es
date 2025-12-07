/**
 * CARPETAS LED - Showcase Simulator
  * Calculadora interactiva para colocación de carpetas LED en escaparates
 */

// ========================================
// Estado del Simulador
// ========================================
let simulatorState = {
    showcaseWidth: 0,
    showcaseHeight: 0,
    selectedProduct: null,
    framesHorizontal: 0,
    framesVertical: 0,
    totalFrames: 0,
    usableWidth: 0,
    usableHeight: 0
};

const PERIMETER_MARGIN = 15; // cm - Margen perimetral fijo desde los bordes del escaparate
const FRAME_SPACING = 10; // cm - Espaciado entre carpetas

// ========================================
// Funciones de Cálculo
// ========================================

/**
 * Calculate how many frames fit in the showcase
  * Tiene en cuenta:
  * - Margen perimetral de 15cm en todos los lados
  * - Espaciado de 10cm entre carpetas
 */
function calculateFrames(showcaseWidth, showcaseHeight, frameWidth, frameHeight) {
    // Aplicar margen de 15cm en todos los lados
    const usableWidth = showcaseWidth - (PERIMETER_MARGIN * 2);
    const usableHeight = showcaseHeight - (PERIMETER_MARGIN * 2);

    // Calcular cuántas carpetas caben con espaciado entre ellas
    // Fórmula: (usableSpace + spacing) / (frameSize + spacing)
    // El +espaciado tiene en cuenta que la última carpeta no necesita espaciado después
    const framesHorizontal = Math.floor((usableWidth + FRAME_SPACING) / (frameWidth + FRAME_SPACING));
    const framesVertical = Math.floor((usableHeight + FRAME_SPACING) / (frameHeight + FRAME_SPACING));
    const totalFrames = framesHorizontal * framesVertical;

    return {
        framesHorizontal,
        framesVertical,
        totalFrames,
        usableWidth,
        usableHeight
    };
}

/**
 * Render the grid preview
 */
function renderGridPreview(framesHorizontal, framesVertical, frameWidth, frameHeight) {
    const gridContainer = document.getElementById('showcase-grid');
    if (!gridContainer) return;

    // Limpiar cuadrícula existente
    gridContainer.innerHTML = '';

    // Establecer plantilla de cuadrícula
    gridContainer.style.gridTemplateColumns = `repeat(${framesHorizontal}, ${frameWidth}px)`;
    gridContainer.style.gridTemplateRows = `repeat(${framesVertical}, ${frameHeight}px)`;

    // Crear elementos de carpeta
    const totalFrames = framesHorizontal * framesVertical;
    for (let i = 0; i < totalFrames; i++) {
        const frameItem = document.createElement('div');
        frameItem.className = 'frame-item';
        frameItem.style.width = `${frameWidth}px`;
        frameItem.style.height = `${frameHeight}px`;
        frameItem.textContent = i + 1;
        frameItem.dataset.index = i;

        // Añadir evento click para toggle on/off
        frameItem.addEventListener('click', function () {
            this.classList.toggle('is-disabled');
            updateActiveFramesCount();
        });

        gridContainer.appendChild(frameItem);
    }
}

/**
 * Update active frames count (excluding disabled ones)
 */
function updateActiveFramesCount() {
    const allFrames = document.querySelectorAll('.frame-item');
    const activeFrames = document.querySelectorAll('.frame-item:not(.is-disabled)');
    const activeCount = activeFrames.length;

    // Actualizar el total en la UI
    const totalElement = document.getElementById('result-total');
    if (totalElement) {
        totalElement.textContent = activeCount;
    }

    // Actualizar el estado del simulador
    if (simulatorState.totalFrames > 0) {
        simulatorState.totalFrames = activeCount;
    }
}


/**
 * Update results display
 */
function updateResults(results, productName) {
    const resultsContainer = document.getElementById('simulator-results');
    if (!resultsContainer) return;

    // Actualizar valores de resultado
    document.getElementById('result-horizontal').textContent = results.framesHorizontal;
    document.getElementById('result-vertical').textContent = results.framesVertical;
    document.getElementById('result-total').textContent = results.totalFrames;

    // Actualizar información de cuadrícula
    document.getElementById('grid-product-name').textContent = productName;

    // Mostrar resultados
    resultsContainer.classList.add('active');

    // Desplazar a resultados
    resultsContainer.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

// ========================================
// Manejadores de Eventos
// ========================================

/**
 * Handle simulator form submission
 */
function handleSimulatorSubmit(event) {
    event.preventDefault();

    // Obtener valores del formulario
    const showcaseWidth = parseFloat(document.getElementById('showcase-width').value);
    const showcaseHeight = parseFloat(document.getElementById('showcase-height').value);
    const productSelect = document.getElementById('product-selector');
    const selectedOption = productSelect.options[productSelect.selectedIndex];

    // Validar entradas
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

    // Obtener dimensiones del producto
    const frameWidth = parseFloat(selectedOption.dataset.width);
    const frameHeight = parseFloat(selectedOption.dataset.height);
    const productId = selectedOption.value;
    const productName = selectedOption.textContent;

    // Comprobar si el escaparate es suficientemente grande
    if (showcaseWidth < (frameWidth + PERIMETER_MARGIN * 2) || showcaseHeight < (frameHeight + PERIMETER_MARGIN * 2)) {
        alert(`El escaparate es demasiado pequeño para este modelo. Necesitas al menos ${frameWidth + PERIMETER_MARGIN * 2}cm de ancho y ${frameHeight + PERIMETER_MARGIN * 2}cm de alto (incluyendo márgenes de 15cm).`);
        return;
    }

    // Calcular carpetas
    const results = calculateFrames(showcaseWidth, showcaseHeight, frameWidth, frameHeight);

    // Actualizar estado
    simulatorState = {
        showcaseWidth,
        showcaseHeight,
        selectedProduct: {
            id: productId,
            name: productName,
            width: frameWidth,
            height: frameHeight
        },
        ...results
    };

    // Renderizar vista previa de cuadrícula (escalar para visualización)
    const scale = Math.min(600 / (results.usableWidth), 400 / (results.usableHeight), 3);
    renderGridPreview(
        results.framesHorizontal,
        results.framesVertical,
        frameWidth * scale,
        frameHeight * scale
    );

    // Actualizar visualización de resultados
    updateResults(results, productName);
}

/**
 * Send simulator data to quote form
 */
function sendToQuoteForm() {
    if (simulatorState.totalFrames === 0) {
        alert('Por favor, calcula primero la configuración del escaparate');
        return;
    }

    // Almacenar datos del simulador en localStorage
    localStorage.setItem('simulatorData', JSON.stringify({
        showcaseWidth: simulatorState.showcaseWidth,
        showcaseHeight: simulatorState.showcaseHeight,
        productId: simulatorState.selectedProduct.id,
        productName: simulatorState.selectedProduct.name,
        quantity: simulatorState.totalFrames,
        framesHorizontal: simulatorState.framesHorizontal,
        framesVertical: simulatorState.framesVertical
    }));

    // Redirigir al formulario de presupuesto
    window.location.href = 'presupuesto.html';
}

/**
 * Reset simulator
 */
function resetSimulator() {
    // Reiniciar formulario
    document.getElementById('simulator-form').reset();

    // Reiniciar estado
    simulatorState = {
        showcaseWidth: 0,
        showcaseHeight: 0,
        selectedProduct: null,
        framesHorizontal: 0,
        framesVertical: 0,
        totalFrames: 0,
        usableWidth: 0,
        usableHeight: 0
    };

    // Ocultar resultados
    const resultsContainer = document.getElementById('simulator-results');
    if (resultsContainer) {
        resultsContainer.classList.remove('active');
    }
}

// ========================================
// Inicializar
// ========================================
document.addEventListener('DOMContentLoaded', function () {
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
});

// Exportar funciones para uso global
window.simulator = {
    calculateFrames,
    sendToQuoteForm,
    resetSimulator,
    getState: () => simulatorState
};
