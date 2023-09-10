import React from 'react'
import Navigation from './Navigation'
import { applyFilterToImage } from '../helpers/createPhotoStrip'
import black from '../images/background/black46.jpeg';
import moment from 'moment';
import QRCode from 'qrcode';

const {ipcRenderer} = window.require('electron')

ipcRenderer.on("getLink", (event, data) => {
    const opts = {
        errorCorrectionLevel: 'H',
    }
    console.log(data)
    QRCode.toCanvas(data.webViewLink, opts, function (err, canvas) {
        if (err) throw err
        var container = document.getElementById('handlePrint')
        container.appendChild(canvas)
        const imageQrCode = canvas.toDataURL("image/png")
        // console.log(data.image)        
    })
})



export default function Step6_HandlePrint(props) {
    ipcRenderer.on("finish", (event) => {
        props.jumpToStep(0)
    })

    const handlePrint = () => {
        const log = props.log + `\nPrinted at ${moment()}`
        const sendCommandToWorker = image => {
            ipcRenderer.send("print", {image: image, log: log});
        }

        applyFilterToImage(black, 1240, 1844, props.filter).then(img => {
            const data = {
                name: moment().format("YYYY_MM_DD_h_mm_ss_a"),
                image: img
            }

            ipcRenderer.send("pushDrive", data)
            // sendCommandToWorker(img);
        })
    }

    return (
        <div className='d-flex justify-content-around' id='handlePrint'>
            <div className='align-self-center'>
                <button className='checked' style={{"height" : "50px", "width": "100px"}} onClick={handlePrint}><i className="bi bi-printer fa-10x h1"></i></button>
            </div>
            <canvas id='qrcode'></canvas>
            <Navigation currentStep={6} jumpToStep={props.jumpToStep} maxStep={6} showBack={true} showNext={false}/>
        </div>
    )
}
