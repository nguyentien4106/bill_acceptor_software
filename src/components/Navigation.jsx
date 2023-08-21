import React, { useState, useEffect, useRef } from 'react'
import back from '../images/button/back.png'
import next from '../images/button/next.png'
import '../css/Navigation.css'
import useCountDown from 'react-countdown-hook'

export default function Navigation(props) {
<<<<<<< Updated upstream
    const {currentStep, jumpToStep, maxStep, showBack, showNext, countdownTime} = props
    const audio = document.getElementById("click-audio");
    const [time, setTime] = useState(countdownTime)
    
=======
    const {currentStep, jumpToStep, maxStep, showBack, showNext, nextCallback} = props
    const audio = document.getElementById("click-audio");
    const sound = document.getElementById("countdown")

    useState(() => {
        const back = document.getElementsByClassName("back-button");
    }, [])

>>>>>>> Stashed changes
    const handlePrevClick = () => {
        audio.play().then(() => {
            jumpToStep(currentStep - 1 > 0 ? currentStep - 1 : 0)
        })
    }

    const handleNextClick = () => {
        audio.play().then(() => {
            jumpToStep(currentStep + 1 < maxStep ? currentStep + 1 : maxStep)
            if(nextCallback){
                nextCallback()
            }
        })
    }

    useEffect(() => {
        if(time === 0){
            jumpToStep(0)
        }

        const interval = setInterval(() => {
            setTime(prev => prev - 1);
        }, 1000);

        return () => clearInterval(interval);
    }, [time]);

    return (
        <>
            <h1 className='top-right'>{timeLeft / 1000}</h1>
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
