import React from 'react'
import video from '../images/screens/step0/waiting.mp4'
import '../css/Step0.css'

function Step0_WaitingScreen({jumpToStep}) {
    const music = document.getElementById("screen_saver_sound");

    const handleClick = () => {
        const audio = document.getElementById("click-audio");
        audio.play().then(() => {
            music.pause()
            music.currentTime = 0;
            jumpToStep(1)
        });
    }

    return (
        <div id="video-container">
            <video id="video-background" src={video} autoPlay loop onClick={handleClick}></video>
        </div>
    )
}

export default Step0_WaitingScreen
