function drawImagesOnCanvas(imageUrls, canvasWidth, canvasHeight) {
  return new Promise((resolve, reject) => {
    var c = document.createElement("canvas");
    c.width = canvasWidth;
    c.height = canvasHeight;
    var ctx = c.getContext("2d");
    var imageObjs = [];
    var imagesLoaded = 0;
    var margin = 10; // Margin between images

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

// Example usage:
const imageUrls = [];
for (let i = 1; i <= 4; i++) {
 imageUrls.push('photo1.jpg');
}

const mergeImages = require('merge-images');
const { Canvas, Image } = require('canvas');
 
mergeImages(imageUrls, {
  Canvas: Canvas,
  Image: Image
})
  .then(b64 => console.log(b64));
// var canvasWidth = 328;
// var canvasHeight = 800; // Increased height to accommodate the images
// drawImagesOnCanvas(imageUrls, canvasWidth, canvasHeight)
//   .then((result) => {
//     // Display the resulting image in the document
//     result.image.onload = () => {
//       document.body.appendChild(result.image);
//     };
//     result.image.src = result.dataURL;
//   })
//   .catch((error) => {
//     console.error(error);
//   });
// Example usage:
// const imageUrls = [];
// for (let i = 1; i <= 4; i++) {
//  imageUrls.push('photo1.jpg');
// }
// var canvasWidth = 328;
// var canvasHeight = 800; // Increased height to accommodate the images
// drawImagesOnCanvas(imageUrls, canvasWidth, canvasHeight);
// // Example usage:

// var canvasWidth = 328;
// var canvasHeight = 526;
