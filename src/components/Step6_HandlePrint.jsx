import React from 'react'
import Navigation from './Navigation'
import { drawImagesOnCanvas, drawQRCodeImage } from '../helpers/createPhotoStrip'
import moment from 'moment';
import QRCode from 'qrcode';
import { useState } from "react";
import "../css/Step6.css"

const {ipcRenderer} = window.require('electron')

const sendCommandToWorker = (image, log) => {
    ipcRenderer.send("print", {image: image, log: log});
}

ipcRenderer.once("getLink", async (event, data) => {
    const opts = {
        errorCorrectionLevel: 'H',
        width: 114,
        margin: 0.5
    }
    const jsonData = JSON.parse(data)
    
    const qr_left = await QRCode.toDataURL(jsonData.qrUrl_cloud_left, opts)
    const qr_right = await QRCode.toDataURL(jsonData.qrUrl_cloud_right, opts)

    ipcRenderer.send("receiveNotice", "Đang tạo ảnh để in.")

    drawQRCodeImage(jsonData.imageForPrint, qr_left, qr_right).then(img => {
        sendCommandToWorker(img, jsonData.log)
    })

})

export default function Step6_HandlePrint(props) {
    const {dataSelected} = props
    const [progress, setProgress] = useState("Đang xử lý...")
    const [currentProgress, setCurrentProgress] = useState(0)
    const [isPrint, setIsPrint] = useState(false)

    useState(() => {
        ipcRenderer.on("finish", event => {
            props.jumpToStep(0)
        })

        ipcRenderer.on("getNotice", (event, notice) => {
            setProgress(notice)
            setCurrentProgress(prev => prev + 10)
        })
    }, [])

    const pushDrive = async log => {
        ipcRenderer.send("receiveNotice", "Đang tạo ảnh trên Cloud.")
        const cloud_left = await drawImagesOnCanvas(props.imagesChoosen, 600, 1800, dataSelected.cloud_left, props.filter);
        const cloud_right = await drawImagesOnCanvas(props.imagesChoosen, 600, 1800, dataSelected.cloud_right, props.filter);
        const data = {
            name: moment().format("YYYY_MM_DD_h_mm_ss_a"),
            cloud_left: cloud_left,
            cloud_right: cloud_right,
            imagesChoosen: props.imagesChoosen,
            filter: props.filter,
            log: log,
            imageForPrint: props.imageForPrint
        }

        ipcRenderer.send("receiveNotice", "Đang đẩy ảnh lên Cloud.")
        ipcRenderer.send("pushDrive", JSON.stringify(data))
    }

    const handlePrint = async () => {
        setIsPrint(true)
        await pushDrive(`${props.log}\nPrinted at ${moment()}`)
    }

    return (
        <>
            <div className='d-flex justify-content-around' id='handlePrint'>
                <div className='align-self-center'>
                    {
                        !isPrint 
                        ? <button className='checked' style={{"height" : "50px", "width": "100px"}} onClick={async () => await handlePrint()}><i className="bi bi-printer fa-10x h1"></i></button>
                        : <div>
                            <h2>{progress}</h2>
                            <progress className="progress is-success is-large" value={currentProgress} max={70}>{currentProgress * 100 / 70}%</progress>
                          </div>
                    }
                </div>
                <Navigation currentStep={6} jumpToStep={props.jumpToStep} maxStep={6} showBack={true} showNext={false} countdowntime={30}/>
            </div>
        </>
        
    )
}
