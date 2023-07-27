import React from 'react'
import { useEffect } from 'react'
import demo from '../images/demo.jpg'
import { useState } from 'react'
import backgroundBlack from '../images/background/black.jpg'
import { drawImagesOnCanvas } from '../helpers/createPhotoStrip'
import printJS from 'print-js'

const {ipcRenderer} = window.require('electron')

export default function Step6_HandlePrint(props) {
    const imagesDemoUrls = [demo, demo, demo, demo]
    const [image, setImage] = useState('')

    useEffect(() => {
        // if(!isAppend){
        //     document.getElementById("root").style.display = "none";

        drawImagesOnCanvas(imagesDemoUrls, 530, 1200, backgroundBlack)
            .then(image => {
                setImage(image)
            })
    }, [])

    const handlePrint = () => {
        printJS({ printable: 'image', type: 'html', header: 'PrintJS - Form Element Selection' })
    }

    const end = () => {
        console.log(props)
        props.jumpToStep(0)
    }

    return (
        <div>
            <img id='image' src={image}></img>
            <button onClick={handlePrint}>print</button>
            <button onClick={end}>End</button>
        </div>
    )
}
