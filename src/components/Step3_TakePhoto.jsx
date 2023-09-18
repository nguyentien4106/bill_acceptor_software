import React, { useState, useRef, useEffect } from 'react';
import '../css/Step3.css'
import { setIntervalX } from '../helpers/helper';
import Navigation from './Navigation';
import cameraButton from '../images/button/camerabutton.png'
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
  "effects/MakeupLook.deepar",
  "effects/Split_View_Look.deepar",
  "effects/flower_face.deepar",
  "effects/Stallone.deepar",
  "effects/galaxy_background_web.deepar",
  "effects/Humanoid.deepar",
  "effects/Neon_Devil_Horns.deepar",
  "effects/Ping_Pong.deepar",
  "effects/Pixel_Hearts.deepar",
  "effects/Snail.deepar",
  "effects/Hope.deepar",
  "effects/Vendetta_Mask.deepar",
  "effects/Fire_Effect.deepar",
];

const effectOptionsLabel = [
  'none',
  'ray-ban-wayfarer',
  'viking',
  'makeup',
  'makeup-split',
  'flower_face',
  'stallone',
  'galaxy',
  'humanoid',
  'devil_horns',
  'ping_pong',
  'pixel_hearts',
  'snail',
  'hope',
  'vendetta',
  'fire'
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
      })
    }
   
  }, [])

  useEffect(() => {
    if(images.length === 6){
      setIsTaking(false)
      document.getElementById("timeup").play()
      deepAR.stopCamera()

      setTimeout(() => {
        props.onSetLog(prev => prev + `\nDone Step 3 at ${moment()}`)
        props.jumpToStep(4);
      }, 1000)
    }
  }, [images.length])

  const handleClickTakePhoto = async () => {
    setIsTaking(true)

  }

  const generateEffectOptions = () => {
    return effectOptionsLabel.map(item => {
      return (
          <div class="slide">
              <img class="responsive-img" src={`thumbs/${item}.png`} />
          </div>
      )
    })
  }
  
  const initCarousel = () => {
    const newCarousel = new Carousel("carousel")
    newCarousel.onChange = async (value) => {
      const loadingSpinner = document.getElementById("loading-spinner");
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
            <div class="carousel" id="carousel">
              <div class="carousel-center" id="carousel-center">
                <div class="lds-ring" id="loading-spinner" style={{display: 'none'}}>
                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div>
                </div>
              </div>
              <div class="carousel-slider">
                {
                  generateEffectOptions()
                }
              </div>
            </div>
          </div>
          <img className={`take-button`} src={cameraButton} onClick={handleClickTakePhoto}>
          </img>
        </div>
        <Navigation currentStep={3} jumpToStep={props.jumpToStep} maxStep={6} showBack={false} showNext={false}/>
        {
          isLoading && <div className='loading'>
              <div className='loading__mask'></div>
              <div className='loading__inner'>
                  <h2>Đang xử lý...</h2>
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