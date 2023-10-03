import React from 'react'
import Navigation from './Navigation'
import { drawImagesOnCanvas, drawImagesOnCanvas1240WithQrCode, drawQRCodeImage } from '../helpers/createPhotoStrip'
import moment from 'moment';
import QRCode from 'qrcode';
import { useState } from "react";
import BounceLoader from "react-spinners/BounceLoader";
import "../css/Step6.css"
import black from "../images/background/basic_black/basic_black_left.jpg"
import white from "../images/background/basic_white/basic_white_left.jpg"

import cloud_template1 from "../images/templates/template1/image_cloud.png"

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
        // const imagePrint = await drawQRCodeImage(jsonData.imageToPrint, qrCodeImage)
        // sendCommandToWorker(imagePrint, jsonData.log)
        console.log(jsonData)
    })
})

export default function Step6_HandlePrint(props) {
    const [loading, setLoading] = useState(false)
    const {dataSelected} = props
    ipcRenderer.on("finish", event => {
        props.jumpToStep(0)
    })

    const pushDrive = async log => {
        const cloud_left = await drawImagesOnCanvas(props.imagesChoosen, 600, 1800, dataSelected.cloud_left, props.filter);
        const cloud_right = await drawImagesOnCanvas(props.imagesChoosen, 600, 1800, dataSelected.cloud_right, props.filter);
        const data = {
            name: moment().format("YYYY_MM_DD_h_mm_ss_a"),
            cloud_left: cloud_left,
            cloud_right: cloud_right,
            imagesChoosen: props.imagesChoosen,
            filter: props.filter,
            log: log,
            imageToPrint: props.imageToPrint
        }
        ipcRenderer.send("pushDrive", JSON.stringify(data))

        // drawImagesOnCanvas(props.imagesChoosen, 600, 1800, cloud_template1, props.filter).then(driveImg => {
        //     const data = {
        //         name: moment().format("YYYY_MM_DD_h_mm_ss_a"),
        //         image: driveImg,
        //         imagesChoosen: props.imagesChoosen,
        //         background: props.background.src,
        //         filter: props.filter,
        //         log: log,
        //         imageToPrint: props.imageToPrint
        //     }
            
        //     ipcRenderer.send("pushDrive", JSON.stringify(data))
        // })

    }

    const handlePrint = async () => {
        setLoading(true)
        await pushDrive(`${props.log}\nPrinted at ${moment()}`)
    }

    return (
        <>
            <div className='d-flex justify-content-around' id='handlePrint'>
                <div className='align-self-center'>
                    <button className='checked' style={{"height" : "50px", "width": "100px"}} onClick={async () => await handlePrint()}><i className="bi bi-printer fa-10x h1"></i></button>
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
