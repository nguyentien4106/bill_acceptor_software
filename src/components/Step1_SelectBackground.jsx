import React, { useEffect, useState } from 'react'
import '../css/Step1_SelectBackground.css'
import { Store } from 'react-notifications-component';

export default function Step1_SelectBackground(props) {
  const [backgroundChoose, setBackgroundChoose] = useState("white ")

  const handleClickBackgroundImage = bg => {
    const audio = document.getElementById("click-audio");
    audio.play().then(() => {
      props.onSetBackground(bg)
      setBackgroundChoose(bg.name)
    })
  }

  useEffect(() => {
    const buttons = document.getElementsByClassName("footer-buttons")[0]
    buttons.style.visibility = 'visible'

    const prev = document.getElementById("prev-button")
    prev.style.visibility = 'hidden'
  })

  return (
    <div id='selectBackground'>
      <div className='d-flex justify-content-start align-items-start w-100'>
          <div className={`white first box ${backgroundChoose === "white" ? "selected" : ""}`} onClick={() => handleClickBackgroundImage(props.backgroundsImage[1])}></div>
          <div className={`black second box ${backgroundChoose === "black" ? "selected" : ""}`} onClick={() => handleClickBackgroundImage(props.backgroundsImage[0])}></div>
      </div>

      {/* <div className='d-flex justify-content-start align-items-start w-100'>
        <legend className='align-items-start justify-content-start'>1. Lựa chọn số lượng </legend>
        <div style={{width: 500}} className='d-flex justify-content-between'>
          {
            props.numberPhotoOptions.map(item => 
              <label key={item} onClick={() => handleClickNumberPhoto(item)} className={currentPhotoNumber === item ? "checked number-photo-option" : "number-photo-option"}>
                {item} Ảnh
              </label>
            )
          }
        </div>
      </div>   */}
      {/* <div className='d-flex justify-content-around align-items-around mt-4 w-100'>
        <legend className='align-self-center'>2. Lựa chọn phông nền</legend>
        <div style={{width: 500}} className='d-flex justify-content-between w-100'>
          <div className='demo'>
            <img className='image-show' src={demoBackground}></img>
          </div>
          <div className='selection d-flex flex-column align-self-center'>
            {
              props.backgroundsImage.map(item => <img key={item.name}
                                                  src={item.src} onClick={() => handleClickBackgroundImage(item)} 
                                                  className={currentBackground.name === item.name ? "image-background-demo-selected" : "image-background-demo"}
                                                />)
            }
          </div>
        
        </div>
      </div> */}
    </div>

  )
}
