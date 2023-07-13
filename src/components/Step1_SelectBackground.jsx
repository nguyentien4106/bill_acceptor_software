import React, { useEffect, useState, useCallback } from 'react'
import '../css/Step1_SelectBackground.css'
import background from '../images/background/background.png'
import black from '../images/black.jpg'
import demo from '../images/demo.png'
import white from '../images/white.jpg'
import createPhotoStrip from '../helpers/createPhotoStrip';

export default function Step1_SelectBackground(props) {
  const imagesDemoUrls = [demo, demo, demo, demo]
  const [currentPhotoNumber, setCurrentPhotoNumber] = useState(props.currentNumberPhoto)
  const [currentBackgroundUrl, setCurrentBackgroundUrl] = useState(props.currentBackgroundUrl)
  const [demoBackground, setDemoBackground] = useState(background);

  const handleClickNumberPhoto = (item) => {
    props.onSetNumberPhoto(item)
    setCurrentPhotoNumber(item)
  }

  const handleClickBackgroundImage = (url) =>{
    props.onSetBackgroundUrl(url)
    setCurrentBackgroundUrl(url)
  }

  useEffect(() => {
    let background;

    if(currentBackgroundUrl === "../images/white.jpg"){
      background = white;
    }
    else {
      background = black;
    }

    createPhotoStrip(imagesDemoUrls, 500, 500, background)
      .then(setDemoBackground)

  }, [currentBackgroundUrl])

  return (
    <div className='step1-container d-flex align-items-start flex-column'>
      <div className='d-flex justify-content-start align-items-start w-100'>
        <legend>1. Lựa chọn số lượng </legend>
        <div style={{width: 500}} className='d-flex justify-content-between'>
          {
            props.numberPhotoOptions.map(item => 
              <label key={item} onClick={() => handleClickNumberPhoto(item)} className={currentPhotoNumber === item ? "checked number-photo-option" : "number-photo-option"}>
                {item} Ảnh
              </label>
            )
          }
        </div>
      </div>  
      <div className='d-flex justify-content-start align-items-start flex-column mt-4 w-100'>
        <legend>2. Lựa chọn phông nền</legend>
        <div style={{width: 500}} className='d-flex justify-content-between w-100'>
          <div className='demo'>
            <img className='image-show' src={demoBackground}></img>
          </div>
          <div className='selection d-flex flex-column'>
            {
              props.backgroundUrls.map(item => <img key={item}
                                                  src={item} onClick={() => handleClickBackgroundImage(item)} 
                                                  className={currentBackgroundUrl === item ? "image-background-demo-selected" : "image-background-demo"}
                                                />)
            }
          </div>
        
        </div>
      </div>
    </div>

  )
}
