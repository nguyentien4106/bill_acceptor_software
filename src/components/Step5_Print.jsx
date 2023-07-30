import React, { useEffect, useState } from 'react'
import demo from '../images/demo.jpg'

export default function Step5_Print(props) {
  const [filter, setFilter] = useState('origin')
  const filtersName = ['origin', 'filter-amaro', 'filter-rise', 'filter-willow', 'filter-slumber', 'filter-x-proII', 'filter-Lo-Fi', 'filter-lark', 'filter-moon']

  useEffect(() => {
    console.log(props.imageToPrint)
  }, [])

  const handleOnClickChooseFilter = filterName => {
    setFilter(filterName)
    props.onSetFilter(filterName)
  }

  return (
    <div className='mt-5 d-flex justify-content-around'>
      <div id='image'>
        <img src={props.imageToPrint} className={`image-show ${filter}`}></img>
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
