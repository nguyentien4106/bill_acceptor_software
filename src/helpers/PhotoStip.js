class PhotoStrip {
    constructor(images, backgroundImageUrl, columns = 3, width = 500, height = 600) {
      this.images = images;
      this.columns = columns;
      this.width = width;
      this.height = height;
      this.backgroundImageUrl = backgroundImageUrl
    }
  
    generate() {
      const stripElem = document.createElement('div');
      stripElem.classList.add('photo-strip');
      stripElem.setAttribute('style', `width: ${210}px; height: ${this.height + 50}px; display: flex; flex-direction: column;`);
      stripElem.style.backgroundImage = `url(${this.backgroundImageUrl})`
      
      const columnElems = [];
      for (let i = 0; i < this.columns; i++) {
        const columnElem = document.createElement('div');
        columnElem.classList.add('photo-strip-column');
        columnElem.setAttribute('style', `width: ${this.width / this.columns}px; height: ${this.height}px;`);
        stripElem.appendChild(columnElem);
        columnElems.push(columnElem);
      }
  
      let columnIndex = 0;
      for (const image of this.images) {
        const imgElem = document.createElement('img');
        imgElem.src = image;
        imgElem.classList.add('photo-strip-image');
        imgElem.setAttribute('style', `max-width: ${this.width / this.columns}px; max-height: ${this.height}px; margin: 20px;`);
        columnElems[columnIndex].appendChild(imgElem);
        columnIndex = (columnIndex + 1) % this.columns;
      }
  
      return stripElem;
    }
  }