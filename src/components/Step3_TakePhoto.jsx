import React, { useState, useRef, useEffect } from 'react';
import '../css/Step3.css'
import { setIntervalX } from '../helpers/helper';
import Navigation from './Navigation';
import cameraButton from '../images/button/camerabutton.png'
import useCountDown from "react-countdown-hook";
import moment from 'moment';

const Step3_TakePhoto = (props) => {
  const videoRef = useRef(null);
  const takeButton = useRef('take')
  const [images, setImages] = useState([])
  const takePhotoAudio = document.getElementById("take_photo");
  const [isClicked, setIsClicked] = useState(false)
  const [isTaking, setIsTaking] = useState(false)
  const [timeLeft, actions] = useCountDown(5000)
  const sound = document.getElementById("countdown")
  const [localStream, setLocalStream] = useState(null)

  useEffect(() => {
    handleCapture();
  }, [])

  useEffect(() => {
    if(images.length === 6){
      vidOff();
      setIsTaking(false)
      sound.pause();
      document.getElementById("timeup").play()

      setTimeout(() => {
        props.onSetLog(prev => prev + `\nDone Step 3 at ${moment()}`)
        props.jumpToStep(4);
      }, 1000)
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
      setLocalStream(stream)
      videoRef.current.srcObject = stream;
    } catch (err) {
      console.error('Error opening camera', err);
    }
  };

  const capturePhoto = () => {
    return new Promise((resolve, reject) => {
      // Access the camera
      takePhotoAudio.play().then(() => {
        const canvas = document.createElement('canvas');
        canvas.width = videoRef.current.videoWidth;
        canvas.height = videoRef.current.videoHeight;
        canvas.getContext('2d').drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
  
        const dataURI = canvas.toDataURL('image/jpg');
        setIsTaking(prev => !prev)
        resolve(dataURI);
      })
    });
  }

  function vidOff() {
    videoRef.current.pause();
    videoRef.current.src = "";
    localStream.getTracks()[0].stop();
  }
  
  const start = () => {
    setIsTaking(true)
    actions.reset()
    actions.start() 
  }

  const handleClickTakePhoto = async () => {
    if(!isClicked){
      setIsClicked(true)
      sound.play()

      start()
      setIntervalX(() => {
        capturePhoto().then(img => {
          setImages(prev => [...prev, img])
          props.onSetImagesTaken(prev => [...prev, img])
          start()
        })
      }, 1000, 6)
    }
  }

  useEffect(() => {
    takeButton.current.addEventListener('click', handleClickTakePhoto)
  }, [])

  return (
      <>
        <div className='d-flex w-100 justify-content-around align-items-around take-photo-background'> 
          {
            isTaking && <h1 className="countdown-timer">{(timeLeft / 1000)}</h1>
          }
          <div className='images'>
            {
              images.map((item, index) => {
                return <img key={index} src={item} className='image'></img>
              })
            }
          </div>
          <div className='camera'>
            <video className='justify-content-center camera-source' ref={videoRef} autoPlay={true}/>
          </div>
          <img className={`take-button ${isClicked ? "d-none" : ""}`} src={cameraButton} ref={takeButton}>
          </img>
        </div>
        <Navigation currentStep={3} jumpToStep={props.jumpToStep} maxStep={6} showBack={false} showNext={false}/>
        
      </>
  );
};

export default Step3_TakePhoto;