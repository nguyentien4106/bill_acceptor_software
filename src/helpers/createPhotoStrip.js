export default async function createPhotoStrip(imagesUrl, canvasWidth, canvasHeight, backgroundUrl, margin = 11) {
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

  ctx.drawImage(background, 0, 0, canvasWidth, 1200);

  await Promise.all(images.map(image => createImage(image)));

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
  return canvas.toDataURL('image/png');

  async function createImage(image) {
    return new Promise((resolve, reject) => {
      image.addEventListener('load', () => resolve(image));
      image.addEventListener('error', error => reject(error));
    });
  }
}

export function drawImagesOnCanvas(imageUrls, canvasWidth, canvasHeight) {
  return new Promise((resolve, reject) => {
    var c = document.createElement("canvas");
    c.width = canvasWidth;
    c.height = canvasHeight;
    var ctx = c.getContext("2d");
    var imageObjs = [];
    var imagesLoaded = 0;
    var margin = 10; // Margin between images
    console.count('count')

    // Load the images
    for (var i = 0; i < imageUrls.length; i++) {
      var imageObj = new Image();
      imageObj.onload = onImageLoad;
      imageObj.src = imageUrls[i];
      imageObjs.push(imageObj);
    }

    // Callback function that is called when an image has finished loading
    function onImageLoad() {
      imagesLoaded++;
      console.count(`load ${imagesLoaded}` )

      if (imagesLoaded === imageObjs.length) {
        // All images have finished loading, draw them onto the canvas
        var x = 0;
        var y = margin; // Start at the top with some margin
        for (var i = 0; i < imageObjs.length; i++) {
          var imageObj = imageObjs[i];
          var aspectRatio = imageObj.width / imageObj.height;
          var height = (canvasWidth / aspectRatio) - margin; // Calculate the height based on the aspect ratio of the image
          ctx.drawImage(imageObj, x, y, canvasWidth, height);
          y += height + margin; // Update the y position for the next image
        }

        // Get the data URL of the canvas
        var img = c.toDataURL("image/png");
        // Resolve the promise with the data URL and the resulting image
        resolve({ dataURL: img, image: new Image() });
      }
    }
  });
}
