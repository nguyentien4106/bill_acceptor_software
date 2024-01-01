import React, { useEffect } from 'react'
import Navigation from './Navigation'
import { drawImagesOnCanvas, drawQRCodeImage } from '../helpers/createPhotoStrip'
import moment from 'moment';
import QRCode from 'qrcode';
import { useState } from "react";
import "../css/Step6.css"

const {ipcRenderer} = window.require('electron')

const sendCommandToWorker = (image, log, qr_left, qr_right, background) => {
    ipcRenderer.send("print", {
        image: image, 
        log: log, 
        url_left: qr_left, 
        url_right: qr_right,
        background: background
    });
}

export default function Step6_HandlePrint(props) {
    const {dataSelected} = props
    const [progress, setProgress] = useState("Đang xử lý...")
    const [currentProgress, setCurrentProgress] = useState(0)
    const [isPrint, setIsPrint] = useState(false)

    useEffect(() => {
        const finishEvent = event => {
            setIsPrint(false)
            props.onSetCanRetake(true)
            props.jumpToStep(0)
        }

        ipcRenderer.on("finish", finishEvent)

        const getNoticeEvent = (event, notice) => {
            setProgress(notice)
            setCurrentProgress(prev => prev + 10)
        }

        ipcRenderer.on("getNotice", getNoticeEvent)

        const getLinkEvent = async (event, data) => {
            const opts = {
                errorCorrectionLevel: 'H',
                width: 125,
                margin: 0.5
            }
            const jsonData = JSON.parse(data)
            
            const qr_left = await QRCode.toDataURL(jsonData.qrUrl_cloud_left, opts)
            const qr_right = await QRCode.toDataURL(jsonData.qrUrl_cloud_right, opts)

            ipcRenderer.send("receiveNotice", "Đang tạo ảnh để in.")

            drawQRCodeImage(jsonData.imageForPrint, qr_left, qr_right).then(img => {
                sendCommandToWorker(img, jsonData.log, jsonData.qrUrl_cloud_left, jsonData.qrUrl_cloud_right, dataSelected.name)
            })

        };

        ipcRenderer.on("getLink", getLinkEvent)

        return () => {
            ipcRenderer.removeAllListeners("finish")
            ipcRenderer.removeAllListeners("getNotice")
            ipcRenderer.removeAllListeners("getLink")
        }

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
            <div id='handlePrint'>
                <div className='align-self-center'>
                    {
                        !isPrint 
                        ? <div className='button-print align-position' onClick={async () => await handlePrint()}></div>
                        : <div className=''>
                            <h2 className='detail-progress'>{progress}</h2>
                            <progress className="position-progress progress is-success is-large align-position" value={currentProgress} max={70}>{currentProgress * 100 / 70}%</progress>
                          </div>
                    }
                </div>
                <Navigation currentStep={6} jumpToStep={props.jumpToStep} maxStep={6} showBack={true} showNext={false} countdowntime={30}/>
            </div>
        </>
        
    )
}
