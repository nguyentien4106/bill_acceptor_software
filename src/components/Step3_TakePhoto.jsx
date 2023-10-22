import React, { useState, useEffect } from 'react';
import '../css/Step3.css'
import Navigation from './Navigation';
import cameraButton from '../images/screens/step3/camera.png'
import useCountDown from "react-countdown-hook";
import moment from 'moment';
import '../css/FaceFilter.css'
import Carousel from '../helpers/carousel'

const override = {
  display: "block",
  margin: "0 auto",
  borderColor: "red",
};

const effectList = [
  "none",
  "effects/ray-ban-wayfarer.deepar",
  "effects/viking_helmet.deepar",
  "effects/flower_face.deepar",
  "effects/galaxy_background_web.deepar",
  "effects/Neon_Devil_Horns.deepar",
  "effects/Pixel_Hearts.deepar",
];

const effectOptionsLabel = [
  'none',
  'ray-ban-wayfarer',
  'viking',
  'flower_face',
  'galaxy',
  'devil_horns',
  'pixel_hearts',
]

const Step3_TakePhoto = (props) => {
  const [images, setImages] = useState([])
  const takePhotoAudio = document.getElementById("take_photo");
  const [isClicked, setIsClicked] = useState(false)
  const [isTaking, setIsTaking] = useState(false)
  const [timeLeft, actions] = useCountDown(5000)
  const [currentEffect, setCurrentEffect] = useState("none")
  const [idx, setIdx] = useState(0)
  const {deepAR} = props
  // const [isLoadingEffect, setIsLoadingEffect] = useState(true)

  useEffect(() => {
    startCamera()    
  }, [])

  useEffect(() => {
    if(images.length === 6){
      setIsTaking(false)
      document.getElementById("timeup").play()
      deepAR.stopCamera()
      
      props.onSetLog(prev => prev + `\nDone Step 3 at ${moment()}`)
      props.jumpToStep(4);
    }
  }, [images.length])

  const startCamera = () => {
    const canvas = deepAR.getCanvas()
    const div = document.getElementById("div")
    div.prepend(canvas)
    deepAR.startCamera()
  }

  const handleClickTakePhoto = async () => {
    setIsTaking(true)
    actions.start()
    setIsClicked(true)
    setTimeout(() => {
      takePhotoAudio.play().then(() => {
        capturePhoto()
        actions.reset()
        setIsClicked(false)
        setIsTaking(false)
      })
    }, 5000)
  }

  const capturePhoto = () => {
    deepAR.takeScreenshot().then(img => {
      setImages(prev => [...prev, img])
      props.onSetImagesTaken(prev => [...prev, img])
    })
  }

  const handleEffect = async index => {
    setIdx(index)
    if(!index){
      await deepAR.clearEffect()
    }
    else if(idx != index){
      await deepAR.switchEffect(effectList[index])
    }

  }

  const generateEffectOptions = () => {
    return effectOptionsLabel.map((item, index) => {
      return (
          <div key={item} className="slide">
              <img 
                className={`responsive-img ${index === idx ? "selected" : ""}`}
                src={`thumbs/${item}.png`} 
                onClick={() => handleEffect(index)}
              />
          </div>
      )
    })
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
          <div className='camera' id='div'>
            <div className="carousel" id="carousel">
              <div></div>
              <div className="carousel-slider">
                {
                  generateEffectOptions()
                }
              </div>
            </div>
          </div>
          <img className={`take-button ${isClicked ? "d-none" : ""}`} src={cameraButton} onClick={handleClickTakePhoto}>
          </img>
        </div>
        <Navigation currentStep={3} jumpToStep={props.jumpToStep} maxStep={6} showBack={false} showNext={false}/>
      </>
  );
};

export default Step3_TakePhoto;