import React, { useEffect, useState } from 'react'
import '../css/Step1_SelectBackground.css'
import Navigation from './Navigation';

export default function Step1_SelectBackground(props) {
  const [backgroundChoose, setBackgroundChoose] = useState("white")

  const handleClickBackgroundImage = bg => {
    const audio = document.getElementById("click-audio");
    audio.play().then(() => {
      props.onSetBackground(bg)
      setBackgroundChoose(bg.name)
    })
  }

  return (
    <div id='selectBackground'>
      <div className='d-flex justify-content-start align-items-center w-100'>
          <div className={`white first ${backgroundChoose === "white" ? "" : ""}`} onClick={() => handleClickBackgroundImage(props.backgroundsImage[1])}>
            {
              backgroundChoose === "white" && <i className="bi bi-check-lg fa-10x h1" style={{fontSize: 200, color: 'pink'}}></i>
            }
          </div>
          <div className={`black second ${backgroundChoose === "black" ? "" : ""}`} onClick={() => handleClickBackgroundImage(props.backgroundsImage[0])}>
            {
              backgroundChoose === "black" && <i className="bi bi-check-lg fa-10x h1" style={{fontSize: 200, color: 'pink'}}></i>
            }
          </div>
      </div>
      <Navigation currentStep={1} jumpToStep={props.jumpToStep} maxStep={6} showBack={true} showNext={true}/>
    </div>
  )
}
