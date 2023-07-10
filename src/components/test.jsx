import React, { useState } from 'react';
import './ImageSelectionPage.css';
import tickIcon from './tick.png';
import image1 from './image1.png';
import image2 from './image2.png';
import image3 from './image3.png';

function ImageSelectionPage() {
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageClick = (image) => {
    setSelectedImage(image);
  };

  return (
    <div>
      <h1>Select an Image</h1>
      <div className="image-container">
        <div
          className={`image ${selectedImage === image1 ? 'selected' : ''}`}
          onClick={() => handleImageClick(image1)}
        >
          <img src={image1} alt="Image 1" />
          {selectedImage === image1 && <img src={tickIcon} alt="Tick" />}
        </div>
        <div
          className={`image ${selectedImage === image2 ? 'selected' : ''}`}
          onClick={() => handleImageClick(image2)}
        >
          <img src={image2} alt="Image 2" />
          {selectedImage === image2 && <img src={tickIcon} alt="Tick" />}
        </div>
        <div
          className={`image ${selectedImage === image3 ? 'selected' : ''}`}
          onClick={() => handleImageClick(image3)}
        >
          <img src={image3} alt="Image 3" />
          {selectedImage === image3 && <img src={tickIcon} alt="Tick" />}
        </div>
      </div>
      <p>You have selected: {selectedImage ? selectedImage.name : 'None'}</p>
    </div>
  );
}

export default ImageSelectionPage;