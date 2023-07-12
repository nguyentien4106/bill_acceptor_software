import React, { useEffect, useState } from 'react';
import createPhotoStrip, {drawImagesOnCanvas} from '../helpers/createPhotoStrip';
import ReactDOM from 'react-dom';
import mergeImages from 'merge-images';
import black from '../images/black.jpg'
import white from '../images/white.jpg'
import demo from '../images/demo.png'

export default function MyComponent() {
  const [imageDataUrl, setImageDataUrl] = useState(null);

  useEffect(() => {
    mergeImages([
      { src: black, x: 0, y : 0},
      { src: white, x: 0, y : 180},
      { src: demo, x: 0, y : 360},
      
    ], {
      width: 200,
      height: 600
    })
      .then(b64 => setImageDataUrl(b64));
  });

  return imageDataUrl ? <img src={imageDataUrl} alt="Combined images" /> : <div>Loading</div>;
}