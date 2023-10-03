import React, { useState } from 'react'
import '../css/Step1.css'
import Navigation from './Navigation';
import basic_black from '../images/screens/step1/basic_black.png';
import select from '../images/screens/step1/select.png'
import selected from '../images/screens/step1/selected.png'
import { useEffect } from 'react';

export default function Step1_SelectBackground(props) {
  const [backgroundChoose, setBackgroundChoose] = useState(props.background.name)
  const {frameOptions} = props
  const [frameSelected, setFrameSelected] = useState(frameOptions[0])

  const handleClickBackgroundImage = bg => {
    const audio = document.getElementById("click-audio");
    audio.play().then(() => {
      props.onSetBackground(bg)
      setBackgroundChoose(bg.name)
    })
  }
  
  document.addEventListener("DOMContentLoaded", (event) => {
    console.log("DOM fully loaded and parsed");
  });

  const handleChooseFrame = frame => {
    const audio = document.getElementById("click-audio");
    audio.play().then(() => {
      setFrameSelected(frame)
    })
  }

  return (
    <div id='selectBackground'>
      <div className='' id='options-panel'>
          {
            frameOptions.map((option, index) => {
              return <div key={index} className='d-flex flex-column'>
                        <div style={{backgroundImage: `url(${option})`}} className='option' onClick={() => handleChooseFrame(option)}></div>
                        <div style={{backgroundImage: `url(${frameSelected === option ? selected : select})`}} className='selecting'></div>
                      </div>
            })
          }
          
      </div>
      <Navigation currentStep={1} jumpToStep={props.jumpToStep} maxStep={6} showBack={true} showNext={true}/>
    </div>
  )
}
