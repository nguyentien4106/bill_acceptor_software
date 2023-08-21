
function drawImagesOnCanvasTest(imageUrls, canvasWidth, canvasHeight, backgroundUrl) {
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
        const margin = (canvasWidth - 600) / 2; // Margin between images
        const imageHeight = 400;
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
              ctx.drawImage(imageObj, x, y , 600, imageHeight);
              y += imageHeight + margin; // Update the y position for the next image
            }
  
            // Get the data URL of the canvas
            // Resolve the promise with the data URL and the resulting image
            resolve(c.toDataURL('image/png'));
          }
        }
      };
      background.onerror = error => reject(error);
      background.src = backgroundUrl
    });
}


function drawImagesOnCanvasTestLandscape(imageUrls, canvasWidth, canvasHeight, backgroundUrl) {
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
        const imageWidth = 400;
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
              ctx.drawImage(imageObj, x, y , imageWidth, canvasHeight - 25);
              x += imageWidth + margin; // Update the y position for the next image
            }
  
            // Get the data URL of the canvas
            // Resolve the promise with the data URL and the resulting image
            resolve(c.toDataURL('image/png'));
          }
        }
      };
      background.onerror = error => reject(error);
      background.src = backgroundUrl;
    });
}

function drawImagesOnCanvasTest1240(imageUrls, canvasWidth, canvasHeight, backgroundUrl) {
    const elementWidth = canvasWidth / 2;
    const elementHeight = canvasHeight;
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
          const margin = (elementWidth - 600) / 2; // Margin between images
          const imageHeight = 400;
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
                ctx.drawImage(imageObj, x, y , 600, imageHeight);
                ctx.drawImage(imageObj, x + elementWidth, y , 600, imageHeight);
                y += imageHeight + margin; // Update the y position for the next image
              }
    
              // Get the data URL of the canvas
              // Resolve the promise with the data URL and the resulting image
              resolve(c.toDataURL('image/png'));
            }
          }
        };
        background.onerror = error => reject(error);
        background.src = backgroundUrl
      });
}
const demo = './demo.jpg'
const black = './black.jpg'
const black_landscape = './black_landscape.jpg'
const demos = [demo, demo, demo, demo]

// drawImagesOnCanvasTest(demos, 634, 1844, black).then(img => {
//     const image = document.getElementById("image")
//     image.src = img
// })

// drawImagesOnCanvasTestLandscape(demos, 1844, 634, black_landscape).then(img => {
//     const image = document.getElementById("image1")
//     image.src = img
// })
drawImagesOnCanvasTest1240(demos, 1240, 1844, black)
    .then(img => {
        console.log(img)
        const image = document.getElementById("image2")
        image.src = img
    })