import React, { useEffect, useState, useCallback } from 'react'
import '../css/Step1_SelectBackground.css'
import createPhotoStrip from '../helpers/createPhotoStrip'
// const {ipcRenderer} = window.require('electron')

export default function Step1_SelectBackground(props) {
  const [currentPhotoNumber, setCurrentPhotoNumber] = useState(props.currentNumberPhoto)
  const [currentBackgroundUrl, setCurrentBackgroundUrl] = useState(props.currentBackgroundUrl)
  const [stripElem, setStripElem] = useState('')

  const handleClickNumberPhoto = (item) => {
    props.onSetNumberPhoto(item)
    setCurrentPhotoNumber(item)
  }

  const handleClickBackgroundImage = (url) =>{
    props.onSetBackgroundUrl(url)
    setCurrentBackgroundUrl(url)
  }


  useEffect(() => {

  }, [currentBackgroundUrl])

  return (
    <div className='step1-container d-flex align-items-start flex-column'>
      <div className='d-flex justify-content-start align-items-start'>
        <legend>1. Lựa chọn số lượng </legend>
        <div style={{width: 500}}>
          {
            props.numberPhotoOptions.map(item => 
              <label key={item} onClick={() => handleClickNumberPhoto(item)} className={currentPhotoNumber === item ? "checked number-photo-option" : "number-photo-option"}>
                {item}Ảnh
              </label>
            )
          }
        </div>
      </div>  
      <div className='d-flex justify-content-start align-items-start flex-column'>
        <legend>2. Lựa chọn phông nền</legend>
        <div style={{width: 500}} className='d-flex justify-content-around w-100'>
          <div className='demo'>
            <img src={stripElem}></img>
          </div>
          <div className='selection'>
            {
              props.backgroundUrls.map(item => <img key={item}
                                                  src={item} onClick={() => handleClickBackgroundImage(item)} 
                                                  className={currentBackgroundUrl === item ? "image-background-demo-selected" : "image-background-demo"}
                                                />)
            }
          </div>
        
        </div>
      </div>
      <div className='test'></div>
    </div>

  )
}
