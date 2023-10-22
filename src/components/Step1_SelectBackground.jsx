import React, { useState } from 'react'
import '../css/Step1.css'
import Navigation from './Navigation';
import select from '../images/screens/step1/select.png'
import selected from '../images/screens/step1/selected.png'

export default function Step1_SelectBackground(props) {
  const {dataFrames, dataSelected} = props
  const [frameSelected, setFrameSelected] = useState(dataSelected.name)

  const handleChooseFrame = itemName => {
    const audio = document.getElementById("click-audio");
    audio.play().then(() => {
      setFrameSelected(itemName)
      console.log(dataFrames.filter(item => item.name === itemName)[0])
      props.onSetDataSelected(dataFrames.filter(item => item.name === itemName)[0])
    })
  }

  return (
    <div id='selectBackground'>
      <div className='' id='options-panel'>
          {
            dataFrames.map((item, index) => {
              return <div key={index} className='d-flex flex-column'>
                        <div style={{backgroundImage: `url(${item.option})`}} className='option' onClick={() => handleChooseFrame(item.name)}></div>
                        <div style={{backgroundImage: `url(${frameSelected === item.name ? selected : select})`}} className='selecting'></div>
                      </div>
            })
          }
          
      </div>
      <Navigation currentStep={1} jumpToStep={props.jumpToStep} maxStep={6} showBack={true} showNext={true} countdownTime={30}/>
    </div>
  )
}
