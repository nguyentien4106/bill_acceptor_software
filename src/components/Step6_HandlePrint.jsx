import React from 'react'
import Navigation from './Navigation'
import { drawImagesOnCanvas, drawImagesOnCanvas1240WithQrCode } from '../helpers/createPhotoStrip'
import moment from 'moment';
import QRCode from 'qrcode';
import { useState } from "react";
import BounceLoader from "react-spinners/BounceLoader";
import "../css/Step6.css"
import black from "../images/background/black_cloud.jpg"
import white from "../images/background/white.jpg"

const {ipcRenderer} = window.require('electron')

const override = {
    display: "block",
    margin: "0 auto",
    borderColor: "red",
};

const sendCommandToWorker = (image, log) => {
    ipcRenderer.send("print", {image: image, log: log});
}

ipcRenderer.once("getLink", (event, data) => {
    const opts = {
        errorCorrectionLevel: 'H',
        width: 114,
        margin: 0.5
    }
    const jsonData = JSON.parse(data)

    QRCode.toDataURL(jsonData.qrUrl, opts, async function (err, qrCodeImage) {
        if (err) throw err
        const imagePrint = await drawImagesOnCanvas1240WithQrCode(jsonData.imagesChoosen, 1240, 1844, jsonData.background, jsonData.filter, qrCodeImage)
        sendCommandToWorker(imagePrint, jsonData.log)
    })
})

export default function Step6_HandlePrint(props) {
    ipcRenderer.on("finish", event => {

        props.jumpToStep(0)
    })
    const [loading, setLoading] = useState(false)

    const pushDrive = log => {
        drawImagesOnCanvas(props.imagesChoosen, 600, 1800, props.background.name === "white" ? white : black, props.filter).then(driveImg => {
            const data = {
                name: moment().format("YYYY_MM_DD_h_mm_ss_a"),
                image: driveImg,
                imagesChoosen: props.imagesChoosen,
                background: props.background.src,
                filter: props.filter,
                log: log
            }
            
            ipcRenderer.send("pushDrive", JSON.stringify(data))
        })
    }

    const handlePrint = () => {
        setLoading(true)
        
        pushDrive(`${props.log}\nPrinted at ${moment()}`)
    }

    return (
        <>
            <div className='d-flex justify-content-around' id='handlePrint'>
                <div className='align-self-center'>
                    <button className='checked' style={{"height" : "50px", "width": "100px"}} onClick={handlePrint}><i className="bi bi-printer fa-10x h1"></i></button>
                </div>
                <Navigation currentStep={6} jumpToStep={props.jumpToStep} maxStep={6} showBack={true} showNext={false} countdowntime={30}/>
            </div>
            <img id='img'></img>
            {
                loading && <div className='loading'>
                    <div className='loading__mask'></div>
                    <div className='loading__inner'>
                        <h2>Đang xử lý...</h2>
                        <br></br>
                        <BounceLoader
                            color={"#c96565"}
                            loading={loading}
                            cssOverride={override}
                            size={150}
                            aria-label="Loading Spinner"
                            data-testid="loader"
                        />
                    </div>
                </div>
            }
        </>
        
    )
}
