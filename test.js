async function createPhotoStrip(imagesUrl, canvasWidth, canvasHeight, backgroundUrl, margin = 11) {
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

const imagesUrl = ['./src/images/demo.jpg', './src/images/demo.jpg', './src/images/demo.jpg', './src/images/demo.jpg']
const bgInUse = './src/images/background/black.jpg'
createPhotoStrip(imagesUrl, 500, 500, bgInUse)
      .then(background => {
        const img = document.createElement("img")
        img.src = background
        img.className = 'photo-strip'
        document.body.appendChild(img);
      })