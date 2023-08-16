import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
// import printJS from 'print-js'
import { getImageWithFilter } from '../helpers/createPhotoStrip'
import demo from '../images/demo.jpg'
import backgroundPrint from '../images/button/print.jpg'
import Navigation from './Navigation'
import { applyFilterToImage } from '../helpers/createPhotoStrip'

const {ipcRenderer} = window.require('electron')

export default function Step6_HandlePrint(props) {
    const [image, setImage] = useState(props.imageToPrint)

    useEffect(() => {
        window.addEventListener('afterprint', function() {
            console.log('Print dialog closed');
          });
    }, [])

    const handlePrint = () => {
        applyFilterToImage(image, 500, 1200, props.filter).then(img => {
            function sendCommandToWorker(content) {
                ipcRenderer.send("print", content);
            }
            console.log(props.imageToPrint)
            sendCommandToWorker(props.imageToPrint);
        })
    }

    const end = () => {
        props.jumpToStep(0)
    }

    return (
        <div className='d-flex justify-content-around' id='handlePrint'>
            <div className='align-self-center'>
                <button className='checked' style={{"height" : "50px", "width": "100px"}} onClick={handlePrint}><i className="bi bi-printer fa-10x h1"></i></button>
            </div>
            <Navigation currentStep={6} jumpToStep={props.jumpToStep} maxStep={6} showBack={true} showNext={false}/>
        </div>
    )
}
