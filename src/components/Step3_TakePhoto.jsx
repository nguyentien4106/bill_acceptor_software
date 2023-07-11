import React, { useState, useRef } from 'react';

export default function Step3_TakePhoto(props) {
  const [imageSrc, setImageSrc] = useState(null);
  const videoRef = useRef(null);

  const handleCapture = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      videoRef.current.srcObject = stream;
    } catch (err) {
      console.error('Error opening camera', err);
      props.onHandleError(err)
    }
  };

  const handleSnapshot = () => {
    const canvas = document.createElement('canvas');
    canvas.width = videoRef.current.videoWidth;
    canvas.height = videoRef.current.videoHeight;
    canvas.getContext('2d').drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);

    const dataURI = canvas.toDataURL('image/jpeg');
    setImageSrc(dataURI);
    videoRef.current.srcObject.getTracks().forEach(track => track.stop());
  };

  return (
    <div>
      {imageSrc ? (
        <img src={imageSrc} alt="snapshot" />
      ) : (
        <div>
          <video ref={videoRef} autoPlay={true} />
          <button onClick={handleCapture}>Open Camera</button>
          <button onClick={handleSnapshot}>Take Picture</button>
        </div>
      )}
    </div>
  );
};
