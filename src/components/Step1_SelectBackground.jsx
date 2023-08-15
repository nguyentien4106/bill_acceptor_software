import React, { useEffect, useState } from 'react'
import '../css/Step1_SelectBackground.css'
import { Store } from 'react-notifications-component';
import Navigation from './Navigation';

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
          <div className={`white first box ${backgroundChoose === "white" ? "selected" : ""}`} onClick={() => handleClickBackgroundImage(props.backgroundsImage[1])}>
            {
              backgroundChoose === "white" && <i class="bi bi-check-lg fa-10x h1"></i>
            }
          </div>
          <div className={`black second box ${backgroundChoose === "black" ? "selected" : ""}`} onClick={() => handleClickBackgroundImage(props.backgroundsImage[0])}>
          {
              backgroundChoose === "black" && <i class="bi bi-check-lg fa-10x h1"></i>
            }
          </div>
      </div>
      <Navigation currentStep={1} jumpToStep={props.jumpToStep} maxStep={6} showBack={true} showNext={true}/>
    </div>
  )
}
