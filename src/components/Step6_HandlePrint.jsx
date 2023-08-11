import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import printJS from 'print-js'
import { getImageWithFilter } from '../helpers/createPhotoStrip'
import demo from '../images/demo.jpg'
export default function Step6_HandlePrint(props) {
    const [image, setImage] = useState(props.imageToPrint)

    useEffect(() => {
        const buttons = document.getElementsByClassName('footer-buttons')[0]
        buttons.style.visibility = "hidden"
    })

    useEffect(() => {
        setImage(demo)
        window.addEventListener('afterprint', function() {
            // Code to execute after the print dialog is closed
            console.log('Print dialog closed');
          });
    }, [])

    const handlePrint = () => {
        printJS({
            printable: image, 
            type: 'image', 
            onPrintDialogClose: end,
            imageStyle: 'width: 177px; height: 700px;',
            style: 'img {margin-left: -20px;}'
        })
        
    }

    const end = () => {
        props.jumpToStep(0)
    }

    return (
        <div className='d-flex justify-content-around'>
            <img id='image' src={image} width={300} height={900}></img>
            <div className='align-self-center'>
                <h2>Nhấn vào nút bên dưới để in hình bạn nhé </h2>
                <button className='checked' style={{"height" : "50px", "width": "100px"}} onClick={handlePrint}><i className="bi bi-printer fa-10x h1"></i></button>
            </div>
            <canvas id='myCanvas' width="200" height="200"></canvas>
        </div>
    )
}
