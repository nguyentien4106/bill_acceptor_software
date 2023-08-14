import React, { useState, useRef, useEffect, forwardRef, useImperativeHandle } from 'react';
import { Store } from 'react-notifications-component';
import '../css/Step3_TakePhoto.css'
import { setIntervalX } from '../helpers/helper';

const Step3_TakePhoto = (props) => {
  const videoRef = useRef(null);
  const [images, setImages] = useState([])
  const takePhotoAudio = document.getElementById("take_photo");
  const [isClicked, setIsClicked] = useState(false)

  useEffect(() => {
    handleCapture();
  }, [])

  useEffect(() => {
    if(images.length === 6){
      const next = document.getElementById("next-button");
      next.style.display = "block"
      Store.addNotification({
        id: "notifyenoughImage",
        message: "Bạn đã chụp đủ số lượng hình ! Bấm kế tiếp để mình đi chọn hình nhé !!!",
        type: "info",
        insert: "top",
        container: "top-right",
        animationIn: ["animate__animated", "animate__fadeIn"],
        animationOut: ["animate__animated", "animate__fadeOut"],
        dismiss: {
          duration: 10000,
          onScreen: true
        }
      })
    }
  }, [images.length])

  const handleCapture = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia(
        { 
          video: {
            facingMode: "user",
            width: 600,
            height: 400
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

    const dataURI = canvas.toDataURL('image/jpg');

    if(images.length < 6){
      takePhotoAudio.play().then(() => {
        setImages([...images, dataURI])
        props.onSetImagesTaken([...images, dataURI])
      })
    }
    else {
      Store.removeAllNotifications()
      Store.addNotification({
        title: "",
        id: "maxPhoto",
        message: "Bạn chỉ có thể chụp tối đa 6 hình !",
        type: "danger",
        insert: "top",
        container: "top-right",
        animationIn: ["animate__animated", "animate__fadeIn"],
        animationOut: ["animate__animated", "animate__fadeOut"],
        dismiss: {
          duration: 2500,
          onScreen: true
        }
      })
      videoRef.current.srcObject.getTracks().forEach(track => track.stop());
    }
    
  };

  const handleClickTakePhoto = () => {
    if(!isClicked){
      setIsClicked(true)
    }
    setIntervalX(handleSnapshot, 5000, 6);
  }

  return (
  <>
    <div className='d-flex w-100 justify-content-around align-items-around' id='take-photo'> 
      {/* <div className='d-flex flex-column w-50 justify-content-center w-75 align-items-center'>
        <div className='video-container mt-5 mb-5 d-flex'>
          <video className='video justify-content-center' ref={videoRef} autoPlay={true}/>
        </div>
      </div>
      <div className='d-flex w-50'>
        <div className='d-flex flex-column m-5'>
          {
            images && images.map((item, index) => {
              if(index < 3){
                return <img key={index} className='image-taken' src={item}></img>
              }
            })
          }
        </div>
        <div className='d-flex flex-column m-5'>
          {
            images && images.map((item, index) => {
              if(index >= 3){
                return <img key={index} className='image-taken' src={item}></img>
              }
            })
          }
        </div>
        
      </div>

      
    </div>
    <div className='button'>
       */}
    <i className={`bi bi-camera fa-10x mt-5 pointer button h1 `} onClick={handleSnapshot}></i>
  </div>
  </>
  );
};

export default Step3_TakePhoto;