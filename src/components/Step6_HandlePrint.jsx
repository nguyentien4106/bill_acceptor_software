import React from 'react'
import Navigation from './Navigation'
import { applyFilterToImage, drawImagesOnCanvas, drawImagesOnCanvas1240WithQrCode } from '../helpers/createPhotoStrip'
import black1 from '../images/background/black.jpg';
import black2 from '../images/background/black46.jpeg';
import white1 from '../images/background/white.jpg';
import demo from '../images/demo.jpg'
import moment from 'moment';
import QRCode from 'qrcode';
import { useState } from "react";
import BounceLoader from "react-spinners/BounceLoader";
import "../css/Step6_HandlePrint.css"
import { Store } from 'react-notifications-component';

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
        errorCorrectionLevel: 'L',
        width: 80,
        margin: 0.5
    }
    const jsonData = JSON.parse(data)
    console.log(jsonData)
    QRCode.toDataURL(jsonData.qrUrl, opts, async function (err, qrCodeImage) {
        if (err) throw err
        const img = document.getElementById("img")
        const imagePrint = await drawImagesOnCanvas1240WithQrCode([demo, demo, demo, demo], 1240, 1844, jsonData.background, jsonData.filter, qrCodeImage)
        img.src = imagePrint
        sendCommandToWorker(imagePrint, "log")
    })
})

export default function Step6_HandlePrint(props) {
    ipcRenderer.on("finish", event => {
        Store.addNotification({
            title: "",
            id: "notify",
            message: "Xong rồi! Hãy nhận lại ảnh của bạn ở khe lấy ảnh nhé.",
            type: "info",
            insert: "top",
            container: "top-right",
            animationIn: ["animate__animated", "animate__fadeIn"],
            animationOut: ["animate__animated", "animate__fadeOut"],
            dismiss: {
                duration: 5000,
            }
        })
        setLoading(prev => false)
        let intervalId = setInterval(() => props.jumpToStep(0), 5000);
        clearInterval(intervalId);
    })
    const [loading, setLoading] = useState(false)

    const pushDrive = () => {
        drawImagesOnCanvas([demo, demo, demo, demo], 600, 1800, props.background.src, props.filter).then(driveImg => {
            const data = {
                name: moment().format("YYYY_MM_DD_h_mm_ss_a"),
                image: driveImg,
                imagesChoosen: props.imagesChoosen,
                background: props.background.src,
                filter: props.filter
            }
            
            ipcRenderer.send("pushDrive", JSON.stringify(data))
        })
    }

    const handlePrint = () => {
        setLoading(true)
        const log = props.log + `${props.log}\nPrinted at ${moment()}`
        
        pushDrive()
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
