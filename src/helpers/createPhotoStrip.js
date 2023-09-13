const filters = [
  {
    name: 'origin',
    value: ''
  },
  {
    name: 'filter-amaro',
    value: 'sepia(.35) contrast(1.1) brightness(1.2) saturate(1.3)'
  },
  {
    name: 'filter-rise',
    value: 'sepia(.25) contrast(1.25) brightness(1.2) saturate(.9)'
  },
  {
    name: 'filter-willow',
    value: 'brightness(1.2) contrast(.85) saturate(.05) sepia(.2)'
  },
  {
    name: 'filter-slumber',
    value: 'sepia(.35) contrast(1.25) saturate(1.25)'
  },
  {
    name: 'filter-x-proII',
    value: 'sepia(.45) contrast(1.25) brightness(1.75) saturate(1.3) hue-rotate(-5deg)'
  },
  {
    name: 'filter-Lo-Fi',
    value: 'saturate(1.1) contrast(1.5)'
  },
  {
    name: 'filter-lark',
    value: 'sepia(.25) contrast(1.2) brightness(1.3) saturate(1.25)'
  },
  {
    name: 'filter-moon',
    value: 'brightness(1.4) contrast(.95) saturate(0) sepia(.35)'
  }
]

// export function applyFilterToImage(base64Image, width, height, filterName) {
//   return new Promise((resolve, reject) => {
//     const image = new Image();
//     image.onload = () => {
//       const canvas = document.createElement('canvas');
//       canvas.width = width;
//       canvas.height = height;
//       const context = canvas.getContext('2d');
      
//       // Apply filter (example: convert image to grayscale)
//       context.filter = filters.filter(item => item.name === filterName)[0].value;
//       context.drawImage(image, 0, 0, width, height);
      
//       // Convert canvas to base64
//       const filteredBase64Image = canvas.toDataURL('image/png');
      
//       resolve(filteredBase64Image);
//     };
//     image.onerror = reject;
//     image.src = base64Image;
//   });
// }

export function drawImagesOnCanvas1240(imageUrls, canvasWidth, canvasHeight, backgroundUrl, filterName) {
  let filter;

  if(filterName){
    filter = filters.filter(item => item.name === filterName)[0].value;
  }

  const elementWidth = canvasWidth / 2;
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
        const imageHeight = 380;
        const imageWidth = 560;
        const margin = (elementWidth - imageWidth) / 2; // Margin between images
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
              const imgFiltred = applyFiltersToImageSync(imageObj, filter)
              
              ctx.drawImage(imgFiltred, x, y , imageWidth, imageHeight);
              ctx.drawImage(imgFiltred, x + elementWidth - 15, y , imageWidth, imageHeight);
              y += imageHeight + margin; // Update the y position for the next image
            }
            resolve(c.toDataURL('image/png'));
          }
        }
      };
      background.onerror = error => reject(error);
      background.src = backgroundUrl
    });
}

export function drawImagesOnCanvas1240WithQrCode(imageUrls, canvasWidth, canvasHeight, backgroundUrl, filterName, qrCodeSrc) {
  const elementWidth = canvasWidth / 2;
  let filter;

  if(filterName){
    filter = filters.filter(item => item.name === filterName)[0].value;
  }

  return new Promise((resolve, reject) => {
      const c = document.createElement("canvas");
      c.width = canvasWidth;
      c.height = canvasHeight;
      const ctx = c.getContext("2d");
    
      // Load the background image
      const background = new Image();
      const qrCode = new Image();
      qrCode.onload = () => {
        ctx.drawImage(qrCode, 520, 1844 - 150, 76, 76);
        ctx.drawImage(qrCode, 1240 - 140, 1844 - 150, 76, 76);
        resolve(c.toDataURL('image/png'));
      }

      background.onload = () => {
        ctx.drawImage(background, 0, 0, canvasWidth, canvasHeight);
        const imageObjs = [];
        let imagesLoaded = 0;
        const imageHeight = 380;
        const imageWidth = 560;
        const margin = (elementWidth - imageWidth) / 2; // Margin between images
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
              const imgFiltred = applyFiltersToImageSync(imageObj, filter)
              
              ctx.drawImage(imgFiltred, x, y , imageWidth, imageHeight);
              ctx.drawImage(imgFiltred, x + elementWidth - 15, y , imageWidth, imageHeight);
              y += imageHeight + margin; // Update the y position for the next image
            }
            qrCode.src = qrCodeSrc
          }
        }
      };
      qrCode.onerror = error => reject(error);

      background.onerror = error => reject(error);
      background.src = backgroundUrl
  });
}

export function drawImagesOnCanvas(imageUrls, canvasWidth, canvasHeight, backgroundUrl, filterName) {
  let filter;

  if(filterName){
    filter = filters.filter(item => item.name === filterName)[0].value;
  }

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
        const imageHeight = 380;
        const imageWidth = 560;
        const ymargin = 15; // Margin between images
        const xmargin = 20; // Margin between images
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
            let x = xmargin; // Start at the left with some margin
            let y = ymargin; // Start at the top with some margin
            for (let i = 0; i < imageObjs.length; i++) {
              const imageObj = imageObjs[i];
              const imgFiltred = applyFiltersToImageSync(imageObj, filter)
              
              ctx.drawImage(imgFiltred, x, y, imageWidth, imageHeight);
              y += imageHeight + ymargin; // Update the y position for the next image
            }
            resolve(c.toDataURL('image/png'));
          }
        }
      };
      background.onerror = error => reject(error);
      background.src = backgroundUrl
  });
}

function applyFiltersToImageSync(imageObject, filter) {
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext('2d');    
  canvas.width = imageObject.width;
  canvas.height = imageObject.height;

  // apply css filters here
  ctx.filter = filter;
  ctx.drawImage(imageObject, 0, 0, canvas.width, canvas.height);
  
  return canvas;
}