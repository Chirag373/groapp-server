// Variables to track zoom state
let currentScale = 1;
const minScale = 0.5;
const maxScale = 3;
const scaleStep = 0.2;

// Element references
let weeklyAdImage;

// Initialize when DOM content is loaded
document.addEventListener('DOMContentLoaded', function() {
    weeklyAdImage = document.getElementById('weeklyAdImage');
    
    if (!weeklyAdImage) {
        console.error('Weekly ad image element not found');
        return;
    }
    
    // Initialize pan functionality
    initPanFunctionality();
});

/**
 * Zoom in the weekly ad image
 * @param {Event} event - Click event
 */
function zoomIn(event) {
    if (currentScale < maxScale) {
        currentScale += scaleStep;
        applyZoom();
    }
    event.preventDefault();
}

/**
 * Zoom out the weekly ad image
 * @param {Event} event - Click event
 */
function zoomOut(event) {
    if (currentScale > minScale) {
        currentScale -= scaleStep;
        applyZoom();
    }
    event.preventDefault();
}

/**
 * Reset zoom to original size
 */
function resetZoom() {
    currentScale = 1;
    applyZoom();
    
    // Reset any panning
    if (weeklyAdImage) {
        weeklyAdImage.style.transform = `scale(${currentScale})`;
        weeklyAdImage.style.transformOrigin = 'center center';
    }
}

/**
 * Apply the current zoom scale to the image
 */
function applyZoom() {
    if (weeklyAdImage) {
        weeklyAdImage.style.transform = `scale(${currentScale})`;
    }
}

/**
 * Initialize pan functionality for the image
 */
function initPanFunctionality() {
    const container = document.querySelector('.zoom-container');
    if (!container || !weeklyAdImage) return;
    
    let isDragging = false;
    let startX, startY;
    let translateX = 0;
    let translateY = 0;
    
    // Mouse events
    container.addEventListener('mousedown', startDrag);
    window.addEventListener('mousemove', drag);
    window.addEventListener('mouseup', endDrag);
    
    // Touch events for mobile
    container.addEventListener('touchstart', startDragTouch);
    window.addEventListener('touchmove', dragTouch);
    window.addEventListener('touchend', endDrag);
    
    function startDrag(e) {
        // Only activate drag when zoomed in
        if (currentScale <= 1) return;
        
        isDragging = true;
        startX = e.clientX;
        startY = e.clientY;
        
        // Prevent default browser behavior like text selection
        e.preventDefault();
    }
    
    function startDragTouch(e) {
        // Only activate drag when zoomed in
        if (currentScale <= 1) return;
        
        isDragging = true;
        startX = e.touches[0].clientX;
        startY = e.touches[0].clientY;
    }
    
    function drag(e) {
        if (!isDragging) return;
        
        const deltaX = e.clientX - startX;
        const deltaY = e.clientY - startY;
        
        translateX += deltaX;
        translateY += deltaY;
        
        weeklyAdImage.style.transform = `scale(${currentScale}) translate(${translateX}px, ${translateY}px)`;
        
        startX = e.clientX;
        startY = e.clientY;
    }
    
    function dragTouch(e) {
        if (!isDragging) return;
        
        const deltaX = e.touches[0].clientX - startX;
        const deltaY = e.touches[0].clientY - startY;
        
        translateX += deltaX;
        translateY += deltaY;
        
        weeklyAdImage.style.transform = `scale(${currentScale}) translate(${translateX}px, ${translateY}px)`;
        
        startX = e.touches[0].clientX;
        startY = e.touches[0].clientY;
        
        // Prevent page scrolling when panning
        e.preventDefault();
    }
    
    function endDrag() {
        isDragging = false;
    }
}