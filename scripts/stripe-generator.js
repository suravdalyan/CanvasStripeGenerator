const container = document.getElementById('container');
const sliderInput = document.getElementById('slider_input');
const sliderThumb = document.getElementById('slider_thumb');
const countOfCanvasElements = 60;
let countOfLoadedElements = 0;

// Check if the browser supports web workers
if (typeof Worker === 'undefined') {
    throw new Error('Web workers are not supported in this browser!')
}
// Use worker to perform processing in the background, separate from the main user interface thread of the browser
const worker = new Worker('./scripts/worker.js');

// Listen for messages coming from the worker
// The function will be called whenever the worker sends a message back to the main thread
worker.onmessage = (messageEvent) => {
    const { imageData, canvasId } = messageEvent.data;
    const canvas = document.getElementById(canvasId);
    const ctx = canvas.getContext('2d', { willReadFrequently: true });

    ctx.putImageData(imageData, 0, 0);
    countOfLoadedElements++;

    if (countOfLoadedElements === countOfCanvasElements) {
        document.getElementById('loader').remove();
        sliderInput.removeAttribute('disabled');
    }
}

window.addEventListener('resize', showSliderValue);
sliderInput.addEventListener('input', showSliderValue, false);
sliderInput.addEventListener('change', updateCanvases, false);

function updateCanvases() {
    if (sliderInput.value < 0 || sliderInput.value > 100) {
        throw Error('Invalid range');
    }

    const loader = document.createElement('div');
    loader.setAttribute('id', 'loader');
    loader.className = 'loader';
    document.body.appendChild(loader);
    sliderInput.setAttribute('disabled', '');
    countOfLoadedElements = 0;

    const canvasElements = document.querySelectorAll('canvas');
    for (let index = 0; index < canvasElements.length; index++) {
        // Clear the canvas before drawing new stripes
        const canvasRenderingContext = canvasElements[index]
            .getContext('2d', { willReadFrequently: true });
        canvasRenderingContext.clearRect(0, 0, canvasElements[index].width, canvasElements[index].height);

        // Get the underlying pixel data for the canvas
        const imageData = canvasRenderingContext
            .getImageData(0, 0, canvasElements[index].width, canvasElements[index].height);

        // Send the message event to the worker
        worker.postMessage({
            imageData,
            thicknessOfWhiteStripes: sliderInput.value,
            canvasId: canvasElements[index].id
        }, [imageData.data.buffer]);
    }
}

function drawCanvases() {
    // Create the canvases by count of canvas elements
    for (let index = 0; index < countOfCanvasElements; index++) {
        const canvas = document.createElement('canvas');
        canvas.setAttribute('id', `canvas-${ index }`);
        canvas.className = 'canvas';
        canvas.width = 500;
        canvas.height = 500;
        container.appendChild(canvas);

        // Create the context of every canvas
        const canvasRenderingContext = canvas
            .getContext('2d', { willReadFrequently: true });
        canvasRenderingContext.clearRect(0, 0, canvas.width, canvas.height);
        const imageData = canvasRenderingContext.getImageData(0, 0, canvas.width, canvas.height);

        // Send the message event to the worker
        worker.postMessage({
            imageData,
            thicknessOfWhiteStripes: sliderInput.value,
            canvasId: canvas.id
        }, [imageData.data.buffer]);
    }
}

function showSliderValue() {
    sliderThumb.innerHTML = sliderInput.value;
}

drawCanvases();
showSliderValue();