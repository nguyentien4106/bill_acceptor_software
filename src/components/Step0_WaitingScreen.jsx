import React from 'react'
import screensaver from '../images/screen_saver.jpg'
import { useEffect } from 'react'

function Step0_WaitingScreen({jumpToStep}) {

    useEffect(() => {
        const buttons = document.getElementsByClassName("footer-buttons")[0]
        buttons.style.visibility = 'hidden'
    })

    const handleClick = () => {
        jumpToStep(1)
    }

    return (
        <div className='saver-container'>
            <img className='screensaver' src={screensaver} onClick={handleClick}></img>
        </div>
    )
}

export default Step0_WaitingScreen
