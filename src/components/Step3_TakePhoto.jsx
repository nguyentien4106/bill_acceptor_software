import React, { useState, useEffect } from 'react';
import '../css/Step3.css'
import Navigation from './Navigation';
import cameraButton from '../images/screens/step3/camera.png'
import useCountDown from "react-countdown-hook";
import moment from 'moment';
import * as deepar from 'deepar';
import BounceLoader from "react-spinners/BounceLoader";
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

let deepAR;

const Step3_TakePhoto = (props) => {
  const [images, setImages] = useState([])
  const takePhotoAudio = document.getElementById("take_photo");
  const [isClicked, setIsClicked] = useState(false)
  const [isTaking, setIsTaking] = useState(false)
  const [timeLeft, actions] = useCountDown(5000)
  const [isLoading, setIsLoading] = useState(true)
  const [currentEffect, setCurrentEffect] = useState(null)

  useEffect(() => {
    const canvas = document.getElementById('deepar-canvas');

    const scale = window.devicePixelRatio || 1;

    const width = window.innerWidth > window.innerHeight ? Math.floor(window.innerHeight * 3 / 2) : window.innerWidth
    canvas.width = Math.floor(width * scale);
    canvas.height = Math.floor(window.innerHeight * scale);

    canvas.style.maxHeight = window.innerHeight + "px";
    canvas.style.maxWidth = width + "px";

    if(!deepAR){
      deepar.initialize({
        licenseKey: '0f80df803ffd1a58c1ccfb606615e3a429c55801750dd37b536270fc0d62bc95cef3fc376bf4dacb',
        previewElement: document.querySelector('#deepar-div'),
        canvas: document.querySelector('#deepar-canvas'),
        deeparWasmPath: '../deepar-resources/wasm/deepar.wasm'
      }).then(res => {
        setIsLoading(false)
        deepAR = res
        initCarousel()
      }).catch(err => {
        props.jumpToStep(7)
      })
    }
  }, [])

  useEffect(() => {
    if(images.length === 6){
      setIsTaking(false)
      document.getElementById("timeup").play()
      deepAR.stopCamera()
      deepAR.shutdown()

      props.onSetLog(prev => prev + `\nDone Step 3 at ${moment()}`)
      props.jumpToStep(4);
    }
  }, [images.length])

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
    }, 500)
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
    const newCarousel = new Carousel("carousel")
    newCarousel.onChange = async (value) => {
      const loadingSpinner = document.getElementById("loading-spinner");
      if(!loadingSpinner){
        return
      }

      if(value === 0){
        loadingSpinner.style.display = "block";
        await deepAR.clearEffect();
        setCurrentEffect(effectList[value])
      }
      else if (currentEffect !== effectList[value]) {
        loadingSpinner.style.display = "block";
        await deepAR.switchEffect(effectList[value]);
        setCurrentEffect(effectList[value])
      }
      loadingSpinner.style.display = "none";
    }
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
            <canvas className='camera-source' id='deepar-canvas'>
            </canvas>
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
        {
          isLoading && <div className='loading'>
              <div className='loading__mask'></div>
              <div className='loading__inner'>
                  <h2 className='text'>Vui lòng đợi...</h2>
                  <br></br>
                  <BounceLoader
                      color={"#c96565"}
                      loading={isLoading}
                      cssOverride={override}
                      size={150}
                      aria-label="Loading Spinner"
                      data-testid="loader"
                  />
              </div>
            </div>
          }
      </>
  );
};

export default Step3_TakePhoto;