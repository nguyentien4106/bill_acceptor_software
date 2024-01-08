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
        ctx.drawImage(applyFiltersToImageSync(thumbnails[0], filter), 50, 50, imageWidth, imageHeight)
        ctx.drawImage(applyFiltersToImageSync(thumbnails[0], filter), 650, 50, imageWidth, imageHeight)

        ctx.drawImage(applyFiltersToImageSync(thumbnails[1], filter), 50, 445, imageWidth, imageHeight)
        ctx.drawImage(applyFiltersToImageSync(thumbnails[1], filter), 650, 445, imageWidth, imageHeight)

        ctx.drawImage(applyFiltersToImageSync(thumbnails[2], filter), 50, 840, imageWidth, imageHeight)
        ctx.drawImage(applyFiltersToImageSync(thumbnails[2], filter), 650, 840, imageWidth, imageHeight)

        ctx.drawImage(applyFiltersToImageSync(thumbnails[3], filter), 50, 1230, imageWidth, imageHeight)
        ctx.drawImage(applyFiltersToImageSync(thumbnails[3], filter), 650, 1230, imageWidth, imageHeight)
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

export function drawQRCodeImage(image, qrCodeLeftSrc, qrCodeRightSrc){
  const imagePrint = new Image()
  imagePrint.src = image

  return new Promise((resolve, reject) => {
    const canvas = document.createElement("canvas");
    canvas.width = 1240;
    canvas.height = 1844;
    const ctx = canvas.getContext("2d");
    const qrWidth = 125
    const qrHeight = 125

    const drawQRCodes = () => {
      ctx.drawImage(qrCodeLeft, 455, 1650, qrWidth, qrHeight)
      ctx.drawImage(qrCodeRight, 1070, 1650, qrWidth, qrHeight)
    }

    const qrCodeLeft = new Image()
    qrCodeLeft.src = qrCodeLeftSrc

    const qrCodeRight = new Image()
    qrCodeRight.onload = () => {
      ctx.drawImage(imagePrint, 0, 0, 1240, 1844)
      drawQRCodes()
      resolve(canvas.toDataURL("image/png"))
    }
    qrCodeRight.src = qrCodeRightSrc
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
      const margin = 30

      const drawThumbails = () => {
        ctx.drawImage(applyFiltersToImageSync(thumbnails[0], filter), margin, 50, imageWidth, imageHeight)
        ctx.drawImage(applyFiltersToImageSync(thumbnails[1], filter), margin, 435, imageWidth, imageHeight)
        ctx.drawImage(applyFiltersToImageSync(thumbnails[2], filter), margin, 820, imageWidth, imageHeight)
        ctx.drawImage(applyFiltersToImageSync(thumbnails[3], filter), margin, 1205, imageWidth, imageHeight)
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
  ctx.setTransform(-1, 0, 0, 1, canvas.width, 0);

  return canvas;
}

function createImageFromBase64Data(base64s){
  return base64s.map(base64=> {
    const image = new Image()
    image.src = base64

    return image
  })
}