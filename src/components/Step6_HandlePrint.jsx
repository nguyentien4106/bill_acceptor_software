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

const {ipcRenderer} = window.require('electron')

const override = {
    display: "block",
    margin: "0 auto",
    borderColor: "red",
  };

export default function Step6_HandlePrint(props) {
    ipcRenderer.on("finish", event => {
        props.jumpToStep(0)
    })

    ipcRenderer.once("getLink", (event, data) => {
        const opts = {
            errorCorrectionLevel: 'H',
            width: 76,
        }
        const jsonData = JSON.parse(data)
        console.log(jsonData)
        QRCode.toDataURL(jsonData.qrUrl, opts, async function (err, qrCodeImage) {
            if (err) throw err
            const img = document.getElementById("img")
            const imagePrint = await drawImagesOnCanvas1240WithQrCode([demo, demo, demo, demo], 1240, 1800, black2, props.filter, qrCodeImage)
            img.src = imagePrint
        })
    })

    const [loading, setLoading] = useState(false)
    const color = "#c96565"

    const pushDrive = () => {
        drawImagesOnCanvas([demo, demo, demo, demo], 600, 1800, props.background.name === "white" ? white1 : black1, props.filter).then(driveImg => {
            const data = {
                name: moment().format("YYYY_MM_DD_h_mm_ss_a"),
                image: driveImg,
            }
            
            ipcRenderer.send("pushDrive", data)
        })
    }

    const handlePrint = () => {
        setLoading(true)
        const log = props.log + `\nPrinted at ${moment()}`
        const sendCommandToWorker = image => {
            ipcRenderer.send("print", {image: image, log: log});
        }

        // applyFilterToImage(black1, 634, 1844, props.filter).then(driveImg => {
        //     const data = {
        //         name: moment().format("YYYY_MM_DD_h_mm_ss_a"),
        //         image: driveImg,
        //     }
            
        //     ipcRenderer.send("pushDrive", data)
        // })
        pushDrive()
    }

    return (
        <>
            <div className='d-flex justify-content-around' id='handlePrint'>
                <div className='align-self-center'>
                    <button className='checked' style={{"height" : "50px", "width": "100px"}} onClick={handlePrint}><i className="bi bi-printer fa-10x h1"></i></button>
                </div>
                <Navigation currentStep={6} jumpToStep={props.jumpToStep} maxStep={6} showBack={true} showNext={false}/>
            </div>
            <img id='img'></img>
            {
                loading && <div className='loading'>
                    <div className='loading__mask'></div>
                    <div className='loading__inner'>
                        <h2>Đang xử lý...</h2>
                        <br></br>
                        <BounceLoader
                            color={color}
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
