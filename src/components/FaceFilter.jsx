import React, { useEffect, useState } from 'react'
import * as deepar from 'deepar'
import '../css/FaceFilter.css'

const effectList = [
    "effects/ray-ban-wayfarer.deepar",
    "effects/viking_helmet.deepar",
    "effects/MakeupLook.deepar",
    "effects/Split_View_Look.deepar",
    "effects/flower_face.deepar",
    "effects/Stallone.deepar",
    "effects/galaxy_background_web.deepar",
    "effects/Humanoid.deepar",
    "effects/Neon_Devil_Horns.deepar",
    "effects/Ping_Pong.deepar",
    "effects/Pixel_Hearts.deepar",
    "effects/Snail.deepar",
    "effects/Hope.deepar",
    "effects/Vendetta_Mask.deepar",
    "effects/Fire_Effect.deepar",
];

const imageFilterLabels = [
    'ray-ban-wayfarer',
    'viking',
    'makeup',
    'makeup-split',
    'flower_face',
    'stallone',
    'galaxy',
    'humanoid',
    'devil_horns',
    'ping_pong',
    'pixel_hearts',
    'snail',
    'hope',
    'vendetta',
    'fire'
]

function FaceFilter(props) {
    const [deepAR, setDeepAR] = useState(null)

    useEffect(() => {
        const init = async () => {
            const deepAr = await deepar.initialize({
                licenseKey: '0f80df803ffd1a58c1ccfb606615e3a429c55801750dd37b536270fc0d62bc95cef3fc376bf4dacb',
                // previewElement: document.querySelector('#deepar-div'),
                // rootPath: "../deepar-resources",
                canvas: document.querySelector('#deepar-canvas'),
                deeparWasmPath: '../deepar-resources/wasm/deepar.wasm'

            });

            return deepAr;
        }

        init().then(da => {
            setDeepAR(da)
        })
        
    }, [])

    const takePhoto = () => {
        deepAR.takeScreenshot().then(image => {
            const img = document.getElementById("img")
            img.src = image
        })
    }

    const handleSwitchFilter = async filterName => {
        console.log(filterName)
        const getEffectName = () => effectList.filter(item => item.includes(filterName))[0]
        console.log(getEffectName())
        await deepAR.switchEffect(getEffectName())

    }

    const renderFilters = () => {
        return imageFilterLabels.map(item => {
            return (
                <div class="slide" onClick={() => handleSwitchFilter(item)}>
                    <img class="responsive-img" src={`thumbs/${item}.png`} />
                </div>
            )
        })
    }

    return (
        <div>
             <div id='deepar-div'></div>
             <canvas style={{width: 600, height: 400}} id='deepar-canvas'></canvas>
             <button onClick={takePhoto}>Capture</button>
             <div class="carousel-slider">
             {
                renderFilters()
             }
             </div>
             
        </div>
    )
}

export default FaceFilter
