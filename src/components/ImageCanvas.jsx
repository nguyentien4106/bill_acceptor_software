import React, { useState, useEffect } from "react";

export default function ImageCanvas({ imageUrls, canvasWidth, canvasHeight }) {
  const [canvasImage, setCanvasImage] = useState(null);

  useEffect(() => {
    // Load the images and draw them onto the canvas
    const canvas = document.createElement("canvas");
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;
    const ctx = canvas.getContext("2d");
    const imageObjs = [];
    let imagesLoaded = 0;
    const margin = 10; // Margin between images

    // Load the images
    for (let i = 0; i < imageUrls.length; i++) {
      const imageObj = new Image();
      imageObj.onload = () => {
        imagesLoaded++;
        console.log('load')
        if (imagesLoaded === imageUrls.length) {
            console.log('render')
          // All images have finished loading, draw them onto the canvas
          let x = 0;
          let y = margin; // Start at the top with some margin
          for (let j = 0; j < imageObjs.length; j++) {
            const imageObj = imageObjs[j];
            const aspectRatio = imageObj.width / imageObj.height;
            const height = (canvasWidth / aspectRatio) - margin; // Calculate the height based on the aspect ratio of the image
            ctx.drawImage(imageObj, x, y, canvasWidth, height);
            y += height + margin; // Update the y position for the next image
          }

          // Set the canvas image state with the resulting canvas
          setCanvasImage(canvas.toDataURL("image/png"));
        }
      };
      imageObj.src = imageUrls[i];
      imageObjs.push(imageObj);
    }
  }, [imageUrls, canvasWidth, canvasHeight, canvasImage]);

  return <img src={canvasImage} width={canvasWidth} height={canvasHeight} />;
}