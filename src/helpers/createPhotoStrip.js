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

export function drawImagesOnCanvas1240(dataBase64s, canvasWidth, canvasHeight, backgroundUrl, filterName) {
  let filter;
  const thumbnails = createImageFromBase64Data(dataBase64s)

  if(filterName){
    filter = filters.filter(item => item.name === filterName)[0].value;
  }

  return new Promise((resolve, reject) => {
      const canvas = document.createElement("canvas");
      canvas.width = canvasWidth;
      canvas.height = canvasHeight;
      const ctx = canvas.getContext("2d");
      let y = 50
      const imageWidth = 540
      const imageHeight = 360
      const margin_bot = 30

      const drawThumbails = () => {
        for(let i = 0; i < 4; i++){
            ctx.drawImage(applyFiltersToImageSync(thumbnails[i], filter), 50, y, imageWidth, imageHeight)
            ctx.drawImage(applyFiltersToImageSync(thumbnails[i], filter), 650, y, imageWidth, imageHeight)
        
            y += imageHeight + margin_bot; // Update the y position for the next image
        }
      }

      const background = new Image();
      background.onload = () => {
          drawThumbails()
          ctx.drawImage(background, 0, 0, canvasWidth, canvasHeight);
          resolve(canvas.toDataURL())
      };

      background.onerror = error => reject(error);
      background.src = backgroundUrl
    });
}

export function drawQRCodeImage(image, qrCodeSrc){
  const imagePrint = new Image()
  imagePrint.src = image

  return new Promise((resolve, reject) => {
    const canvas = document.createElement("canvas");
    canvas.width = 1240;
    canvas.height = 1844;
    const ctx = canvas.getContext("2d");
    const qrWidth = 114
    const qrHeight = 114

    const drawQRCodes = () => {
      ctx.drawImage(qrCodeImage, 460, 1600, qrWidth, qrHeight)
      ctx.drawImage(qrCodeImage, 1076, 1600, qrWidth, qrHeight)
    }


    const qrCodeImage = new Image()
    qrCodeImage.onload = () => {
      ctx.drawImage(imagePrint, 0, 0, 1240, 1844)
      drawQRCodes()
      resolve(canvas.toDataURL("image/png"))
    }
    qrCodeImage.src = qrCodeSrc
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
        ctx.drawImage(qrCode, 520 - 38, 1844 - 150, 114, 114);
        ctx.drawImage(qrCode, 1240 - 158, 1844 - 150, 114, 114);
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
  const thumbnails = createImageFromBase64Data(imageUrls)

  if(filterName){
    filter = filters.filter(item => item.name === filterName)[0].value;
  }

  return new Promise((resolve, reject) => {
      const c = document.createElement("canvas");
      c.width = canvasWidth;
      c.height = canvasHeight;
      const ctx = c.getContext("2d");
      const imageWidth = 540
      const imageHeight = 360
      const margin_bot = 30

      const drawThumbails = () => {
        ctx.drawImage(applyFiltersToImageSync(thumbnails[0], filter), 30, 30, imageWidth, imageHeight)
        ctx.drawImage(applyFiltersToImageSync(thumbnails[1], filter), 30, 420, imageWidth, imageHeight)
        ctx.drawImage(applyFiltersToImageSync(thumbnails[2], filter), 30, 450 + 360, imageWidth, imageHeight)
        ctx.drawImage(applyFiltersToImageSync(thumbnails[3], filter), 30, 450 + 360 + 30, imageWidth, imageHeight)
      }
      // Load the background image
      const background = new Image();
      background.onload = () => {
        drawThumbails()
        ctx.drawImage(background, 0, 0, canvasWidth, canvasHeight);
        resolve(c.toDataURL("image/png"))
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


// export function drawImagesOnCanvas1240WithQrCode1(thumbnails, canvasWidth, canvasHeight, backgroundUrl, filterName, qrCodeSrc) {
//   const elementWidth = canvasWidth / 2;
//   let filter;

//   if(filterName){
//     filter = filters.filter(item => item.name === filterName)[0].value;
//   }

//   return new Promise((resolve, reject) => {
//       const c = document.createElement("canvas");
//       c.width = canvasWidth;
//       c.height = canvasHeight;
//       const ctx = c.getContext("2d");
    
//       // Load the background image
//       const background = new Image();
//       const qrCode = new Image();
//       qrCode.onload = () => {
//         ctx.drawImage(qrCode, 520 - 38, 1844 - 150, 114, 114);
//         ctx.drawImage(qrCode, 1240 - 158, 1844 - 150, 114, 114);
//         resolve(c.toDataURL('image/png'));
//       }

//       background.onload = () => {
//         ctx.drawImage(background, 0, 0, canvasWidth, canvasHeight);
        
//       };
//       background.onerror = error => reject(error);
//       background.src = backgroundUrl
//   });
// }

function createImageFromBase64Data(base64s){
  return base64s.map(base64=> {
    const image = new Image()
    image.src = base64

    return image
  })
}