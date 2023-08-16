import React, { useState } from 'react'
import back from '../images/button/back.png'
import next from '../images/button/next.png'
import '../css/Navigation.css'

export default function Navigation(props) {
    const {currentStep, jumpToStep, maxStep, showBack, showNext} = props
    const audio = document.getElementById("click-audio");

    useState(() => {

        const back = document.getElementsByClassName("back-button");


    }, [])

    const handlePrevClick = () => {
        audio.play().then(() => {
            jumpToStep(currentStep - 1 > 0 ? currentStep - 1 : 0)
        })
    }

    const handleNextClick = () => {
        audio.play().then(() => {
            jumpToStep(currentStep + 1 < maxStep ? currentStep + 1 : maxStep)
        })
    }

    return (
        <>
            {
                showBack === true && <img src={back} className='img-button back-button' onClick={handlePrevClick}/>
            }
            {
                showNext === true && <img src={next} className='img-button next-button' onClick={handleNextClick}/>
            }
        </>
    )
}
