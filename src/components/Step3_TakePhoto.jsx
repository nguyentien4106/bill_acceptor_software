import React, { useState, useRef } from 'react';

export default function Step3_TakePhoto(props) {
  const videoRef = useRef(null);
  const [images, setImages] = useState([])

  const handleCapture = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia(
        { 
          video: {
            facingMode: "user",
            width: 600,
            height: 600
          }
        });

      videoRef.current.srcObject = stream;
    } catch (err) {
      console.error('Error opening camera', err);
    }
  };

  const handleSnapshot = () => {
    if(!videoRef.current.srcObject){
      return
    }

    const canvas = document.createElement('canvas');
    canvas.width = videoRef.current.videoWidth;
    canvas.height = videoRef.current.videoHeight;
    canvas.getContext('2d').drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);

    const dataURI = canvas.toDataURL('image/jpeg');

    if(images.length < 6){
      setImages([...images, dataURI])
      props.onSetImagesTaken([...images, dataURI])
      handleCapture()
    }
    else{
      videoRef.current.srcObject.getTracks().forEach(track => track.stop());
      videoRef.current = null
    }
    
  };

  return (
    <div className='d-flex w-100 justify-content-around align-items-around'> 
      <div className='d-flex flex-column justify-content-center w-75 align-items-center'>
        <div className='video'>
          <video ref={videoRef} autoPlay={true}/>
        </div>
        <div className='button'>
          <button onClick={handleCapture}>Open Camera</button>
          <button onClick={handleSnapshot}>Take Picture</button>
        </div>
      </div>
      <div className='d-flex'>
        <div className='d-flex flex-column m-5'>
          {
            images && images.map((item, index) => {
              if(index < 3){
                return <img className='image-taken' src={item}></img>
              }
            })
          }
        </div>
        <div className='d-flex flex-column m-5'>
          {
            images && images.map((item, index) => {
              if(index >= 3){
                return <img className='image-taken' src={item}></img>
              }
            })
          }
        </div>
        
      </div>
    </div>
  );
};
