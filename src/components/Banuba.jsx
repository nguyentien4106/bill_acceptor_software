import React, { useEffect, useState } from 'react'
import {
    Dom,
    Effect,
    Image,
    ImageCapture,
    Module,
    Player,
    VideoRecorder,
    Webcam
  } from "https://cdn.jsdelivr.net/npm/@banuba/webar/dist/BanubaSDK.browser.esm.min.js"

const modulesList = [
    'background',
    'body',
    'eyes',
    'face_tracker',
    'hair',
    'hands',
    'lips',
    'skin',
]
function Banuba(props) {
    const [player, setPlayer] = useState(null)
    const [capture, setCapture] = useState(null)

    useEffect(() => {
        const initial = async () => {
            const [p, modules] = await Promise.all([
                Player.create({
                  clientToken: window.BANUBA_CLIENT_TOKEN,
                  proxyVideoRequestsTo: null,
                  useFutureInterpolate: false,
                }),
                Module.preload(modulesList.map(m => {
                  return `https://cdn.jsdelivr.net/npm/@banuba/webar/dist/modules/${m}.zip`
                }))
            ])
    
            await p.addModule(...modules)
            return p
        }
        initial().then(setPlayer)
    }, [])


    useEffect(() => {
        const desiredWidth = 540 * 2
        const desiredHeight = 360 * 2

        const resize = (frameWidth, frameHeight) => {
            const wRatio = desiredWidth / frameWidth
            const hRatio = desiredHeight / frameHeight
            const ratio = Math.max(wRatio, hRatio)
            console.log(ratio)
            console.log(frameWidth)
            console.log(frameHeight)
            const resizedWidth = ratio * frameWidth
            const resizedHeight = ratio * frameHeight
        
            return [resizedWidth, resizedHeight]
        }
        
        const crop = (renderWidth, renderHeight) => {
            const dx = (renderWidth - desiredWidth) / 2
            const dy = (renderHeight - desiredHeight) / 2
        
            return [dx, dy, desiredWidth, desiredHeight]
        }

        if(!player) return
        setCapture(new ImageCapture(player))
        player.use(new Webcam(), {resize, crop})
        Dom.render(player, "#webar")
        // startFpsTracking()

    }, [player])
    
    const [images, setImages] = useState([])

    const takePhoto = async () => {
        capture.takePhoto({
            width: 540,
            height: 360,
            type: "image/png",
        }).then(image => {
            setImages(prev => [...prev, URL.createObjectURL(image)])
        })
    }

    return (
        <div>
            <div id="webar"></div>
            <button onClick={takePhoto}>TakePhoto</button>
            {
                images && images.map(item => <img src={item}></img>)
            }
        </div>
    )
}

export default Banuba
