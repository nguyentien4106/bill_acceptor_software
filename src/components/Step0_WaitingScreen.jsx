import React from 'react'
import screensaver from '../images/gif_screen_saver_.gif'
import { useEffect } from 'react'

function Step0_WaitingScreen({jumpToStep}) {
    const music = document.getElementById("screen_saver_sound");
    useEffect(() => {
        const buttons = document.getElementsByClassName("footer-buttons")[0]
        buttons.style.visibility = 'hidden'
        
        music.loop = true;
        music.play()
    })

    const handleClick = () => {
        const audio = document.getElementById("click-audio");
    
        audio.play().then( () => {
            music.pause()
            music.currentTime = 0;
            jumpToStep(1)
        });
    }

    return (
        <div className='saver-container' onClick={handleClick}>
            <img className='screensaver' src={screensaver} onClick={handleClick}></img>
        </div>
    )
}

export default Step0_WaitingScreen
