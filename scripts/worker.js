const whiteColor = [255, 255, 255, 255];
const blackColor = [0, 0, 0, 255];

// Listen for incoming messages from the main thread
onmessage = function(messageEvent) {
    const { imageData, thicknessOfWhiteStripes, canvasId } = messageEvent.data;
    // Random start point of the black stripe based on white stripe thickness
    const startCoordinateOfBlackStripe = Math.floor(Math.random() * thicknessOfWhiteStripes);

    if (!(+thicknessOfWhiteStripes)) {
        // Fill all pixels with black if thickness of the white stripes is 0
        for (let index = 0; index < imageData.data.length; index += 4) {
            imageData.data.set(blackColor, index);
        }
    } else {
        for (let coordinateX = 0; coordinateX < imageData.width; coordinateX++) {
            for (let coordinateY = 0; coordinateY < imageData.height; coordinateY++) {
                // Calculate the index of the pixel in the array
                // Each pixel is represented by 4 array elements - Red, Green, Blue and Alpha channels
                // Multiply by 4 to get to the correct index in array
                const index = (coordinateX + coordinateY * imageData.width) * 4;
                // Calculate the shifted coordinate
                const shiftedY = coordinateY + startCoordinateOfBlackStripe;

                // Draw the 45 Degree stripes
                if (Math.floor((coordinateX + shiftedY) / thicknessOfWhiteStripes) % 2 === 0) {
                    imageData.data.set(whiteColor, index);
                } else if ((coordinateX + shiftedY) % thicknessOfWhiteStripes === 0) {
                    imageData.data.set(blackColor, index);
                }
            }
        }
    }

    postMessage({ imageData, canvasId });
}