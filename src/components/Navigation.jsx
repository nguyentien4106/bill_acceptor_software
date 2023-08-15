import React from 'react'
import back from '../images/button/back.png'
import next from '../images/button/next.png'
import '../css/Navigation.css'
export default function Navigation(props) {
    const {currentStep, jumpToStep, maxStep, showBack, showNext} = props

    return (
        <>
            {
                showBack === true && <img src={back} className='img-button back-button' onClick={() => jumpToStep(currentStep - 1 > 0 ? currentStep - 1 : 0)}/>
            }
            {
                showNext === true && <img src={next} className='img-button next-button' onClick={() => jumpToStep(currentStep + 1 < maxStep ? currentStep + 1 : maxStep)}/>
            }
        </>
    )
}
