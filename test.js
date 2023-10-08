
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
const img = '/test_frame/sticker_purple.png'
divideImage(img)
