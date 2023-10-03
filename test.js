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
  
function drawImagesOnCanvas1240(imageUrls, canvasWidth, canvasHeight, backgroundUrl, filterName) {
    let filter;
  
    if(filterName){
      filter = filters.filter(item => item.name === filterName)[0].value;
    }
  
    const elementWidth = canvasWidth / 2; // 620
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
              let y = 50; // Start at the top with some margin
              for (let i = 0; i < imageObjs.length; i++) {
                const imageObj = imageObjs[i];
                const imgFiltred = applyFiltersToImageSync(imageObj, filter)
                
                ctx.drawImage(imgFiltred, 50, y , 540, imageHeight); // 50 
                ctx.drawImage(imgFiltred, 650, y , 540, imageHeight);
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

function drawImagesOnCanvas1240Image(images, canvasWidth, canvasHeight, backgroundUrl, filterName, logo, stickers) {
    let filter;

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
        const space = 30 
        const stickerWidth = 100
        const stickerHeight = 100

        const drawImages = () => {
            for(let i = 0; i < 4; i++){
                ctx.drawImage(images[i], 50, y, imageWidth, imageHeight)
                ctx.drawImage(images[i], 650, y, imageWidth, imageHeight)
            
                y += imageHeight + 30; // Update the y position for the next image
            }
        }

        const drawStickers = () => {
            ctx.drawImage(stickers[0], imageWidth, 50, stickerWidth, stickerHeight)
            ctx.drawImage(stickers[1], imageWidth * 2 + 30, imageHeight, stickerWidth, stickerHeight)
            ctx.drawImage(stickers[2], imageWidth, 2 * imageHeight + 30, stickerWidth, stickerHeight)
            ctx.drawImage(stickers[3], 30, 3 * imageHeight, stickerWidth, stickerHeight)
            ctx.drawImage(stickers[4], 2 * imageWidth, 4 * imageHeight + 30, stickerWidth, stickerHeight)
        }

        const drawLogo = () => {
            ctx.drawImage(logo, 50, (imageHeight + space) * 4 + 40, 300, 150)
            ctx.drawImage(logo, 650, (imageHeight + space) * 4 + 40, 300, 150)
        }
        // Load the background image
        const background = new Image();
        background.onload = () => {
            ctx.drawImage(background, 0, 0, canvasWidth, canvasHeight);
            drawImages()
            drawLogo()
            drawStickers()
            resolve(canvas.toDataURL())
        };

        background.onerror = error => reject(error);
        background.src = backgroundUrl
      });
}

function drawImagesOnCanvas1240WithQrCode(imageUrls, canvasWidth, canvasHeight, backgroundUrl, filterName, qrCodeSrc) {
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
  
  function drawImagesOnCanvas(imageUrls, canvasWidth, canvasHeight, backgroundUrl, filterName) {
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

const background = '/test_frame/background.png'
const logo = '/test_frame/logo.png'
const demo = '/test_frame/demo.jpg'

const demoImg = new Image()
demoImg.src = demo

const logoImg = new Image(200, 100)
logoImg.src = logo
logoImg.width = 200
logoImg.height = 100

const stickers = []
for(let i = 1; i <= 5; i++){
    const sticker = new Image()
    sticker.src = `/test_frame/sticker${i}.png`
    stickers.push(sticker)
}


// drawImagesOnCanvas1240Image([demoImg, demoImg, demoImg, demoImg], 1240, 1844, background, null, logoImg, stickers).then(img => {
//     const image = document.getElementById("image")
//     image.src = img
// })

function divideImage(image) {
  const img = new Image()
  img.onload = () => {
    const c = document.createElement("canvas");
    c.width = 620;
    c.height = 1844;
    const c1 = document.createElement("canvas");
    c1.width = 620;
    c1.height = 1844;
    const ctx = c.getContext("2d");
    const ctx1 = c1.getContext("2d");
    ctx.drawImage(img, 20, 0, 600, 1844, 0, 0, 620, 1844)
    ctx1.drawImage(img, 620, 0, 600, 1844, 0, 0, 620, 1844)
    
    
    document.body.append(c)
    document.body.append(c1)
  }
  
  img.src = image
}

divideImage("sicker_pink.png")
