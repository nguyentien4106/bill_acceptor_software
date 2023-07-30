import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import printJS from 'print-js'
import resizeImage from 'resize-image'

export default function Step6_HandlePrint(props) {
    const [image, setImage] = useState('')

    useEffect(() => {
        setImage(props.imageToPrint)
        const buttons = document.getElementsByClassName('footer-buttons')[0]
        buttons.style.display = "none"
    }, [])

    const handlePrint = () => {
        // Set up the print settings
        const img= resizeImage.resize(document.getElementById("image"), 800, 3000, resizeImage.PNG)
        setImage(img)
        printJS({ printable: img, type: 'image', onPrintDialogClose: () => {console.log('close'); end()}})
        end()
    }

    const end = () => {

        props.jumpToStep(0)
    }

    return (
        <div>
            <img id='image' className={`${props.filter}`} src={image} width={300} height={900}></img>
            <button onClick={handlePrint}>print</button>
        </div>
    )
}
