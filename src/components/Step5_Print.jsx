import React, { useEffect, useState } from 'react'
import demo from '../images/demo.jpg'
import { PrinterFill } from "react-bootstrap-icons";
import backgroundBlack from '../images/background/black.jpg'
import { drawImagesOnCanvas } from '../helpers/createPhotoStrip';
const {ipcRenderer} = window.require('electron')

export default function Step5_Print(props) {
  const [filter, setFilter] = useState('origin')
  const filtersName = ['origin', 'filter-amaro', 'filter-rise', 'filter-willow', 'filter-slumber', 'filter-x-proII', 'filter-Lo-Fi', 'filter-lark', 'filter-moon']
  const imagesDemoUrls = [demo, demo, demo, demo]
  const [testImage, setTestImage] = useState(null)

  useEffect(() => {
    drawImagesOnCanvas(imagesDemoUrls, 530, 1200, backgroundBlack)
    .then(setTestImage)
  }, [])

  const handlePrint = () => {
    var divElement = document.getElementById("image");
    var win = window.open('', '', 'height=700,width=700');
    win.document.write(divElement.outerHTML);     // Write contents in the new window.
    win.document.close();
    win.print();  
  
  }

  useEffect(() => {
    props.onSetImageToPrint(testImage)
  }, [])

  const Print = () => {
    ipcRenderer.send("print", "print this")
  }

  return (
    <div className='mt-5 d-flex justify-content-around'>
      <div id='image'>
        <img src={props.imageToPrint ? props.imageToPrint : testImage} className={`image-show ${filter}`}></img>
      </div>
      <div className='imagesTaken align-item-center align-self-center'>
        <h2>Bạn hãy chọn filter cho tấm hình để in nhé !!</h2>
        <div className='first'>
          {filtersName.map((filterName, index) => {
            if(index <= 4){
              return <img key={filterName} className={`${filterName} image-filter-demo ${filter === filterName ? "checked" : ""}`} src={demo} onClick={() => setFilter(filterName)}></img>
            }
          })}
        </div>
        <div className='second mt-4'>
          {filtersName.length >= 3 && filtersName.map((filterName, index) => {
            if(index >= 5){
              return <img key={filterName} className={`${filterName} image-filter-demo ${filter === filterName ? "checked" : ""}`} src={demo} onClick={() => setFilter(filterName)}></img>
            }
          })}
        </div>
        {/* <PrinterFill className='mt-5 pointer' onClick={handlePrint} size={70}></PrinterFill> */}
        {/* <i className="bi bi-printer-fill fa-10x"></i> */}
        <button onClick={Print}>Print</button>
      </div>
    </div>
  )
}
