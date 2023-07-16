import React, { useEffect, useState } from 'react'
import demo from '../images/demo.jpg'

export default function Step5_Print(props) {
  const [filter, setFilter] = useState('origin')
  const filtersName = ['origin', 'filter-amaro', 'filter-rise', 'filter-willow', 'filter-slumber', 'filter-x-proII', 'filter-Lo-Fi', 'filter-lark', 'filter-moon']

  const handlePrint = () => {
    var divElement = document.getElementById("image");
    var printContents = divElement.innerHTML;
    var originalContents = document.body.innerHTML;
    document.body.innerHTML = printContents;
    window.print({
      silent: true, // to suppress print dialog box
      printerName: "Microsoft Print to PDF", // name of the printer to use
      printerType: "Laser", // type of the printer to use
      printQuality: "High", // quality of the printer output
      color: true // whether to print in color or black and white
    });
    // document.body.innerHTML = originalContents;
  
  }

  return (
    <div className='mt-5 d-flex justify-content-around'>
      <img id='image' src={props.imageToPrint} className={`image-show ${filter}`}></img>
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
        <button className='mt-5' onClick={() => handlePrint()}>Print</button>
      </div>
    </div>
  )
}
