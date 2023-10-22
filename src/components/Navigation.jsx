import React, { useState, useEffect } from 'react'
import back from '../images/screens/step1/back.png'
import next from '../images/screens/step1/next.png'
import '../css/Navigation.css'

export default function Navigation(props) {
    const {currentStep, jumpToStep, maxStep, showBack, showNext, countdownTime} = props
    const audio = document.getElementById("click-audio");
    const [time, setTime] = useState(countdownTime)

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

    useEffect(() => {
        if(time <= 0){
            jumpToStep(0)
        }

        const interval = setInterval(() => {
            setTime(prev => prev - 1);
        }, 1000);

        return () => clearInterval(interval);
    }, [time]);

    return (
        <>
            {
                countdownTime && <h1 className="circle">{time}</h1>
            }
            {
                showBack === true && <img src={back} className='img-button back-button' onClick={handlePrevClick}/>
            }
            {
                showNext === true && <img src={next} className='img-button next-button' onClick={handleNextClick}/>
            }
        </>
    )
}
