import React, { useState, useRef } from 'react';

export default function Step3_TakePhoto(props) {
  const [imageSrc, setImageSrc] = useState(null);
  const videoRef = useRef(null);
  const [images, setImages] = useState([])

  const handleCapture = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia(
        { 
          video: true,
          facingMode: { exact: "environment" },
        });
      videoRef.current.srcObject = stream;
    } catch (err) {
      console.error('Error opening camera', err);
    }
  };

  const handleSnapshot = () => {
    const canvas = document.createElement('canvas');
    canvas.width = videoRef.current.videoWidth;
    canvas.height = videoRef.current.videoHeight;
    canvas.getContext('2d').drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);

    const dataURI = canvas.toDataURL('image/jpeg');
    // setImageSrc(dataURI);

    if(images.length < 6){
      setImages([...images, dataURI])
      handleCapture()
    }
    else{
      console.log('stop')
      videoRef.current.srcObject.getTracks().forEach(track => track.stop());
    }
    
  };

  return (
    <div>
      <div>
        <video ref={videoRef} autoPlay={true} />
        <button onClick={handleCapture}>Open Camera</button>
        <button onClick={handleSnapshot}>Take Picture</button>
      </div>
      {
        images.length && images.map(item => <img src={item} alt="snapshot" />)
      }
    </div>
  );
};
