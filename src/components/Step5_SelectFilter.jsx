import React, { useEffect, useState } from 'react'
import demo from '../images/demo.jpg'
import { applyFilterToImage, drawImagesOnCanvas } from '../helpers/createPhotoStrip'
import Navigation from './Navigation';
import '../css/Step5.css'
import filterButton from '../images/button/button.png'

export default function Step5_SelectFilter(props) {
  const [filter, setFilter] = useState('origin')
  const filtersName = ['origin', 'filter-amaro', 'filter-rise', 'filter-willow', 'filter-slumber', 'filter-x-proII', 'filter-Lo-Fi', 'filter-lark', 'filter-moon']
  const {imageToPrint} = props

  // useEffect(() => {
  //   drawImagesOnCanvas(props.imagesChoosen, 500, 1200, props.background).then(img => setImageToPrint1(img))
  // }, [])

  const handleOnClickChooseFilter = filterName => {
    setFilter(filterName)
    props.onSetFilter(filterName)
    applyFilterToImage(imageToPrint, 500, 1200, filterName).then(photo => {
    })
  }


  return (
    <div className='d-flex justify-content-around commonBackground'>
      <div className='image-demo'>
        <img src={imageToPrint} className={`image-show ${filter}`}></img>
      </div>
      <div className=''>
        <h2>Bạn hãy chọn filter cho tấm hình để in nhé !!</h2>
        <div className='first-col-filter'>
          {filtersName.map((filterName, index) => {
            if(index <= 4){
              return <div key={filterName} className={`${filterName} image-filter-demo ${filter === filterName ? "checked" : ""}`}  onClick={() => handleOnClickChooseFilter(filterName)}>{filterName}</div>
            }
          })}
        </div>
        <div className='second-col-filter mt-4'>
          {filtersName.length >= 3 && filtersName.map((filterName, index) => {
            if(index >= 5){
              return <div key={filterName} className={`${filterName} image-filter-demo ${filter === filterName ? "checked" : ""}`} src={filterButton} onClick={() => handleOnClickChooseFilter(filterName)}></div>
            }
          })}
        </div>
      </div>
      <Navigation currentStep={5} jumpToStep={props.jumpToStep} maxStep={6} showBack={true} showNext={true}/>
    </div>
  )
}
