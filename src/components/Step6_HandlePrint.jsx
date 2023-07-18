import React from 'react'
import { useEffect } from 'react'
import demo from '../images/demo.jpg'
import { useState } from 'react'
import backgroundBlack from '../images/background/black.jpg'
import { drawImagesOnCanvas } from '../helpers/createPhotoStrip'

const {ipcRenderer} = window.require('electron')
let isAppend = false;

export default function Step6_HandlePrint(props) {
    const imagesDemoUrls = [demo, demo, demo, demo]
    const [image, setImage] = useState('')

    useEffect(() => {
        if(!isAppend){
            document.getElementById("root").style.display = "none";

            drawImagesOnCanvas(imagesDemoUrls, 530, 1200, backgroundBlack)
                .then(image => {
                    setImage(image)
                    var img = document.createElement("img");
                    img.src = image;
                    document.body.append(img)
                    // document.querySelectorAll('.footer-buttons button').forEach(function(el) {
                    //     el.style.display = 'none';
                    //  });
    
                    ipcRenderer.send('print', 'data')
                    isAppend = true
                    console.log('apeend')

                })
        }
    }, [])

    return (<></>)
}
