import React, { useState, useRef, useEffect, forwardRef, useImperativeHandle } from 'react';
import { Store } from 'react-notifications-component';
import '../css/Step3_TakePhoto.css'
import { setIntervalX } from '../helpers/helper';
import Navigation from './Navigation';
import demo from '../images/demo.jpg'
import cameraButton from '../images/button/camerabutton.png'
import Countdown from "react-countdown";
const Step3_TakePhoto = (props) => {
  const videoRef = useRef(null);
  const takeButton = useRef('take')
  const handleSnapShot = useRef('shot')
  const [images, setImages] = useState([])
  const takePhotoAudio = document.getElementById("take_photo");
  const [isClicked, setIsClicked] = useState(false)
  const imagesTest = [demo, demo, demo, demo, demo]
  const [isTaking, setIsTaking] = useState(false)
  const [timer, setTimer] = useState(Date.now())

  useEffect(() => {
    handleCapture();
  }, [])

  useEffect(() => {
    if(images.length === 6){
      // const next = document.getElementById("next-button");
      // next.style.display = "block"
      // Store.addNotification({
      //   id: "notifyenoughImage",
      //   message: "Bạn đã chụp đủ số lượng hình ! Bấm kế tiếp để mình đi chọn hình nhé !!!",
      //   type: "info",
      //   insert: "top",
      //   container: "top-right",
      //   animationIn: ["animate__animated", "animate__fadeIn"],
      //   animationOut: ["animate__animated", "animate__fadeOut"],
      //   dismiss: {
      //     duration: 10000,
      //     onScreen: true
      //   }
      // })
      
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
    console.log('take')
    if(!videoRef.current.srcObject){
      return
    }

    setIsTaking(false)

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
      setIsTaking(true)
      handleSnapShot.current.click()
      setIntervalX(() => {
        setTimer(Date.now())
        setIsTaking(true)
        handleSnapShot.current.click()
      }, 3000, 3)
    }
  }

  useEffect(() => {
    takeButton.current.addEventListener('click', handleClickTakePhoto)
    handleSnapShot.current.addEventListener('click', handleSnapshot)
  }, [])

  const renderer = ({ seconds, completed }) => {
    if (!completed) {
      // Render a complete state
      return <h1 className='countdown-timer'>{seconds}</h1>;
    } 
  }

  return (
      <>
        <div className='d-flex w-100 justify-content-around align-items-around take-photo-background'> 
          
          <div className='images'>
            {
              imagesTest.map((item, index) => {
                return <img key={index} src={item} className='image'></img>
              })
            }
          </div>
          <div className='camera'>
            <video className='justify-content-center camera-source' ref={videoRef} autoPlay={true}/>
          </div>
          <img className={`take-button ${isClicked ? "d-none" : ""}`} src={cameraButton} ref={takeButton}>
          </img>
          <button ref={handleSnapShot} className='d-none'></button>
        </div>
        <Navigation currentStep={3} jumpToStep={props.jumpToStep} maxStep={6} showBack={true} showNext={true}/>
        {
          isTaking && <Countdown date={timer + 5000} renderer={renderer} />
        }
      </>
  );
};

export default Step3_TakePhoto;