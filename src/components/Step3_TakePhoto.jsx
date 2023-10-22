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
  // const [currentEffect, setCurrentEffect] = useState("none")
  const {deepAR} = props

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
    initCarousel()
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

  const generateEffectOptions = () => {
    return effectOptionsLabel.map(item => {
      return (
          <div key={item} className="slide">
              <img className="responsive-img" src={`thumbs/${item}.png`} />
          </div>
      )
    })
  }
  
  const initCarousel = () => {
    // const newCarousel = new Carousel("carousel")
    // newCarousel.onChange = async (value) => {
    //   const loadingSpinner = document.getElementById("loading-spinner");
    //   if(!loadingSpinner){
    //     return
    //   }

    //   if(value === 0){
    //     loadingSpinner.style.display = "block";
    //     await deepAR.clearEffect();
    //     setCurrentEffect(prev => effectList[value])
    //   }
    //   else if (currentEffect !== effectList[value]) {
    //     loadingSpinner.style.display = "block";
    //     await deepAR.switchEffect(effectList[value]);
    //     setCurrentEffect(prev => effectList[value])
    //   }
    //   loadingSpinner.style.display = "none";
    // }
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
              <div className="carousel-center" id="carousel-center">
                <div className="lds-ring" id="loading-spinner" style={{display: 'none'}}>
                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div>
                </div>
              </div>
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