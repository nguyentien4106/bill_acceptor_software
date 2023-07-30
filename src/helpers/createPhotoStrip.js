
export function drawImagesOnCanvas(imageUrls, canvasWidth, canvasHeight, backgroundUrl) {
  return new Promise((resolve, reject) => {
    const c = document.createElement("canvas");
    c.width = canvasWidth;
    c.height = canvasHeight;
    const ctx = c.getContext("2d");

    // Load the background image
    const background = new Image();
    background.onload = () => {
      ctx.drawImage(background, 0, 0, canvasWidth, canvasHeight);

      // Load the images
      const imageObjs = [];
      let imagesLoaded = 0;
      const margin = 10; // Margin between images
      const imageWidth = (canvasWidth - margin * 2) / 2 - 8; // Fixed width for each image
      const imageHeight = imageWidth; // Fixed height for each image
      for (let i = 0; i < imageUrls.length; i++) {
        const imageObj = new Image();
        imageObj.onload = onImageLoad;
        imageObj.src = imageUrls[i];
        imageObjs.push(imageObj);
      }

      // Callback function that is called when an image has finished loading
      function onImageLoad() {
        imagesLoaded++;

        if (imagesLoaded === imageObjs.length) {
          // All images have finished loading, draw them onto the canvas
          let x = margin; // Start at the left with some margin
          let y = margin; // Start at the top with some margin
          for (let i = 0; i < imageObjs.length; i++) {
            const imageObj = imageObjs[i];
            ctx.drawImage(imageObj, x, y, imageWidth + 250, imageHeight);
            y += imageHeight + margin; // Update the y position for the next image
          }

          // Get the data URL of the canvas
          // Resolve the promise with the data URL and the resulting image
          resolve(c.toDataURL("image/png"));
        }
      }
    };
    background.onerror = error => reject(error);
    background.src = backgroundUrl;
  });
}