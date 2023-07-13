import React, { useEffect, useState } from 'react';
import createPhotoStrip, {drawImagesOnCanvas} from '../helpers/createPhotoStrip';
import black from '../images/black.jpg'
import demo from '../images/demo.png'

export default function MyComponent() {
  const [imageDataUrl, setImageDataUrl] = useState('');

  useEffect(() => {
  

    const imagesUrl = [demo, demo, demo, demo]

    createPhotoStrip(imagesUrl, 500, 500, black).then(imageDataUrl => setImageDataUrl(imageDataUrl))

  }, []);

  return imageDataUrl ? <img src={imageDataUrl} alt="Combined images" /> : <div>Loading</div>;
}