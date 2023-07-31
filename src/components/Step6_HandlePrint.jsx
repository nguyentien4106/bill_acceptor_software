import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import printJS from 'print-js'

export default function Step6_HandlePrint(props) {
    const [image, setImage] = useState('')

    useEffect(() => {
        setImage(props.imageToPrint)

    }, [])

    useEffect(() => {
        const buttons = document.getElementsByClassName('footer-buttons')[0]
        buttons.style.visibility = "hidden"
    })

    const handlePrint = () => {
        printJS({ printable: "image", type: 'html', onPrintDialogClose: (e) => {console.log('close', e); end()}, silent: true})
    }

    const end = () => {
        props.jumpToStep(0)
    }

    return (
        <div className='d-flex justify-content-around'>
            <img id='image' className={`${props.filter}`} src={image} width={300} height={900}></img>
            <div className='align-self-center'>
                <h2>Nhấn vào nút bên dưới để in hình bạn nhé </h2>
                <button className='checked' style={{"height" : "50px", "width": "100px"}} onClick={handlePrint}><i className="bi bi-printer fa-10x h1"></i></button>
            </div>
        </div>
    )
}
