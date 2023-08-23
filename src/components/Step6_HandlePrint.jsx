import React from 'react'
import Navigation from './Navigation'
import { applyFilterToImage } from '../helpers/createPhotoStrip'
import black from '../images/background/black.jpg';
import moment from 'moment';
const {ipcRenderer} = window.require('electron')

export default function Step6_HandlePrint(props) {
    ipcRenderer.on("finish", (event) => {
        props.jumpToStep(0)
    })

    const handlePrint = () => {
        const log = props.log + `\nPrinted at ${moment()}`
        const sendCommandToWorker = image => {
            ipcRenderer.send("print", {image: image, log: log});
        }

        applyFilterToImage(props.imageToPrint, 1240, 1844, props.filter).then(img => {
            sendCommandToWorker(img);
        })
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
