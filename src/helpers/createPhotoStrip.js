export default function createPhotoStrip(imagesUrl, canvasWidth, canvasHeight, backgroundUrl, margin = 11) {
  return new Promise((resolve, reject) => {
    const images = [];
    for (let i = 0; i < 4; i++) {
      const image = new Image();
      image.src = imagesUrl[i];
      images.push(image);
    }
    const background = new Image();
    background.src = backgroundUrl;

    const canvas = document.createElement('canvas');
    canvas.width = 273;
    canvas.height = 1200;

    const ctx = canvas.getContext('2d');

    background.addEventListener('load', () => {
      ctx.drawImage(background, 0, 0, canvasWidth, 1200);
      Promise.all(images.map(image => createImage(image)))
        .then(() => {
          const upperLeft = images[0];
          const upperRight = images[1];
          const lowerLeft = images[2];
          const lowerRight = images[3];

          const width = canvasWidth / 2;
          const height = canvasHeight / 2;
          const upperRightX = canvasWidth / 2;
          ctx.drawImage(background, 0, 0, 280, 1200);

          ctx.drawImage(upperLeft, margin, margin, width, height);
          ctx.drawImage(upperRight, margin, upperRightX + margin * 2, width, height);
          ctx.drawImage(lowerLeft, margin, upperRightX * 2 + margin * 3, width, height);
          ctx.drawImage(lowerRight, margin, upperRightX * 3 + margin * 4, width, height);

          resolve(canvas.toDataURL('image/png'));
        })
        .catch(error => reject(error));
    });

    background.addEventListener('error', error => reject(error));

    function createImage(image) {
      return new Promise((resolve, reject) => {
        image.addEventListener('load', () => resolve(image));
        image.addEventListener('error', error => reject(error));
      });
    }
  });
}

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
      const imageWidth = (canvasWidth - margin * 2) / 2; // Fixed width for each image
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