import React, { useState, useEffect, useRef } from 'react';
import '../css/Step3.css'
import Navigation from './Navigation';
import cameraButton from '../images/screens/step3/camera.png'
import useCountDown from "react-countdown-hook";
import moment from 'moment';
import '../css/FaceFilter.css'
import { setIntervalX } from '../helpers/helper';

const Step3_TakePhoto = (props) => {
  const [images, setImages] = useState([])
  const takePhotoAudio = document.getElementById("take_photo");
  const [isClicked, setIsClicked] = useState(false)
  const [isTaking, setIsTaking] = useState(false)
  const [timeLeft, actions] = useCountDown(5000)
  const videoRef = useRef(null);

  useEffect(() => {
    const startCamera = async () => {
      try {
        const constraints = {
          video: true,
          height: 400,
          width: 600
        };
        const stream = await navigator.mediaDevices.getUserMedia(constraints);
        videoRef.current.srcObject = stream;
      } catch (error) {
        console.error('Error accessing camera:', error);
      }
    };

    startCamera();
  }, []);

  useEffect(() => {
    if(images.length === 6){
      setIsTaking(false)
      document.getElementById("timeup").play()
      props.onSetImagesTaken(images)
      props.onSetLog(prev => prev + `\nDone Step 3 at ${moment()}`)
      props.jumpToStep(4);
    }
  }, [images.length])


  const capturePhoto = () => {
    const video = videoRef.current;
    const canvas = document.createElement("canvas");
    
    // Set canvas dimensions to match the video stream
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    // Draw the current video frame onto the canvas
    canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height);

    // Get the base64-encoded image data from the canvas
    const photo = canvas.toDataURL('image/png');

    setImages(prev => [...prev, photo]);
  };

  const handleClickTakePhoto = async () => {
    setIsTaking(true)
    actions.start()
    setIsClicked(true)

    setIntervalX(() => {
      actions.reset()
      actions.start()
      takePhotoAudio.play().then(() => {
        capturePhoto()
      })
    }, 5000, 6)
  }

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
            <video ref={videoRef} autoPlay height={720} width={1080}/>;
          </div>
          <img className={`take-button ${isClicked ? "d-none" : ""}`} src={cameraButton} onClick={handleClickTakePhoto}>
          </img>
        </div>
        <Navigation currentStep={3} jumpToStep={props.jumpToStep} maxStep={6} showBack={false} showNext={false}/>
      </>
  );
};

export default Step3_TakePhoto;