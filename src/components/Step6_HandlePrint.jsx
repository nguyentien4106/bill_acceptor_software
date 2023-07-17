import React from 'react'
import { useEffect } from 'react'
import demo from '../images/demo.jpg'
import { useState } from 'react'
import backgroundBlack from '../images/background/black.jpg'
import { drawImagesOnCanvas } from '../helpers/createPhotoStrip'

const {ipcRenderer} = window.require('electron')

export default function Step6_HandlePrint(props) {
    const imagesDemoUrls = [demo, demo, demo, demo]
    const [image, setImage] = useState('')

    useEffect(() => {
        drawImagesOnCanvas(imagesDemoUrls, 530, 1200, backgroundBlack)
            .then(setImage)
        document.querySelectorAll('.footer-buttons button').forEach(function(el) {
            el.style.display = 'none';
         });
        ipcRenderer.send('print', 'data')
    }, [])

    return (
        <div>
        <img src={image}></img>
        </div>
    )
}
