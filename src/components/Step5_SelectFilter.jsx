import React, { useState } from 'react'
import demo from '../images/demo.jpg'
import { drawImagesOnCanvas } from '../helpers/createPhotoStrip'
import { useEffect } from 'react'

export default function Step5_SelectFilter(props) {
  const [filter, setFilter] = useState('origin')
  const filtersName = ['origin', 'filter-amaro', 'filter-rise', 'filter-willow', 'filter-slumber', 'filter-x-proII', 'filter-Lo-Fi', 'filter-lark', 'filter-moon']
  const {imageToPrint} = props

  const handleOnClickChooseFilter = filterName => {
    setFilter(filterName)
    props.onSetFilter(filterName)
  }


  return (
    <div className='mt-5 d-flex justify-content-around'>
      <div id='image'>
        <img src={imageToPrint} className={`image-show ${filter}`}></img>
      </div>
      <div className='imagesTaken align-item-center align-self-center'>
        <h2>Bạn hãy chọn filter cho tấm hình để in nhé !!</h2>
        <div className='first'>
          {filtersName.map((filterName, index) => {
            if(index <= 4){
              return <img key={filterName} className={`${filterName} image-filter-demo ${filter === filterName ? "checked" : ""}`} src={demo} onClick={() => handleOnClickChooseFilter(filterName)}></img>
            }
          })}
        </div>
        <div className='second mt-4'>
          {filtersName.length >= 3 && filtersName.map((filterName, index) => {
            if(index >= 5){
              return <img key={filterName} className={`${filterName} image-filter-demo ${filter === filterName ? "checked" : ""}`} src={demo} onClick={() => handleOnClickChooseFilter(filterName)}></img>
            }
          })}
        </div>
      </div>
    </div>
  )
}
