/**
 * CARPETAS LED - Showcase Simulator
 * Interactive calculator for LED frame placement in showcases
 */

// ========================================
// Simulator State
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

const PERIMETER_MARGIN = 15; // cm - Fixed perimeter margin from showcase edges
const FRAME_SPACING = 10; // cm - Spacing between frames

// ========================================
// Calculation Functions
// ========================================

/**
 * Calculate how many frames fit in the showcase
 * Takes into account:
 * - 15cm perimeter margin on all sides
 * - 10cm spacing between frames
 */
function calculateFrames(showcaseWidth, showcaseHeight, frameWidth, frameHeight) {
    // Apply 15cm margin on all sides
    const usableWidth = showcaseWidth - (PERIMETER_MARGIN * 2);
    const usableHeight = showcaseHeight - (PERIMETER_MARGIN * 2);

    // Calculate how many frames fit with spacing between them
    // Formula: (usableSpace + spacing) / (frameSize + spacing)
    // The +spacing accounts for the fact that the last frame doesn't need spacing after it
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

    // Clear existing grid
    gridContainer.innerHTML = '';

    // Set grid template
    gridContainer.style.gridTemplateColumns = `repeat(${framesHorizontal}, ${frameWidth}px)`;
    gridContainer.style.gridTemplateRows = `repeat(${framesVertical}, ${frameHeight}px)`;

    // Create frame items
    const totalFrames = framesHorizontal * framesVertical;
    for (let i = 0; i < totalFrames; i++) {
        const frameItem = document.createElement('div');
        frameItem.className = 'frame-item';
        frameItem.style.width = `${frameWidth}px`;
        frameItem.style.height = `${frameHeight}px`;
        frameItem.textContent = i + 1;
        gridContainer.appendChild(frameItem);
    }
}

/**
 * Update results display
 */
function updateResults(results, productName) {
    const resultsContainer = document.getElementById('simulator-results');
    if (!resultsContainer) return;

    // Update result values
    document.getElementById('result-horizontal').textContent = results.framesHorizontal;
    document.getElementById('result-vertical').textContent = results.framesVertical;
    document.getElementById('result-total').textContent = results.totalFrames;

    // Update grid info
    document.getElementById('grid-product-name').textContent = productName;

    // Show results
    resultsContainer.classList.add('active');

    // Scroll to results
    resultsContainer.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

// ========================================
// Event Handlers
// ========================================

/**
 * Handle simulator form submission
 */
function handleSimulatorSubmit(event) {
    event.preventDefault();

    // Get form values
    const showcaseWidth = parseFloat(document.getElementById('showcase-width').value);
    const showcaseHeight = parseFloat(document.getElementById('showcase-height').value);
    const productSelect = document.getElementById('product-selector');
    const selectedOption = productSelect.options[productSelect.selectedIndex];

    // Validate inputs
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

    // Get product dimensions
    const frameWidth = parseFloat(selectedOption.dataset.width);
    const frameHeight = parseFloat(selectedOption.dataset.height);
    const productId = selectedOption.value;
    const productName = selectedOption.textContent;

    // Check if showcase is large enough
    if (showcaseWidth < (frameWidth + PERIMETER_MARGIN * 2) || showcaseHeight < (frameHeight + PERIMETER_MARGIN * 2)) {
        alert(`El escaparate es demasiado pequeño para este modelo. Necesitas al menos ${frameWidth + PERIMETER_MARGIN * 2}cm de ancho y ${frameHeight + PERIMETER_MARGIN * 2}cm de alto (incluyendo márgenes de 15cm).`);
        return;
    }

    // Calculate frames
    const results = calculateFrames(showcaseWidth, showcaseHeight, frameWidth, frameHeight);

    // Update state
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

    // Render grid preview (scale down for display)
    const scale = Math.min(600 / (results.usableWidth), 400 / (results.usableHeight), 3);
    renderGridPreview(
        results.framesHorizontal,
        results.framesVertical,
        frameWidth * scale,
        frameHeight * scale
    );

    // Update results display
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

    // Store simulator data in localStorage
    localStorage.setItem('simulatorData', JSON.stringify({
        showcaseWidth: simulatorState.showcaseWidth,
        showcaseHeight: simulatorState.showcaseHeight,
        productId: simulatorState.selectedProduct.id,
        productName: simulatorState.selectedProduct.name,
        quantity: simulatorState.totalFrames,
        framesHorizontal: simulatorState.framesHorizontal,
        framesVertical: simulatorState.framesVertical
    }));

    // Redirect to quote form
    window.location.href = 'presupuesto.html';
}

/**
 * Reset simulator
 */
function resetSimulator() {
    // Reset form
    document.getElementById('simulator-form').reset();

    // Reset state
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

    // Hide results
    const resultsContainer = document.getElementById('simulator-results');
    if (resultsContainer) {
        resultsContainer.classList.remove('active');
    }
}

// ========================================
// Initialize
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

// Export functions for global use
window.simulator = {
    calculateFrames,
    sendToQuoteForm,
    resetSimulator,
    getState: () => simulatorState
};
