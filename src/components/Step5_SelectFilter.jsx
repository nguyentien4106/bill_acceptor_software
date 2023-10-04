import React, { useEffect, useState } from 'react'
import Navigation from './Navigation';
import '../css/Step5.css'
import { getFilters } from '../helpers/helper';
import moment from 'moment';
import { drawImagesOnCanvas1240 } from '../helpers/createPhotoStrip';

export default function Step5_SelectFilter(props) {
  const [filter, setFilter] = useState('origin')
  const filters = getFilters()
  const filterFirstCol = filters.slice(0, 4);
  const filterSecondCol = filters.slice(4)
  const [imageDemo, setImageDemo] = useState(null)
  const {dataSelected} = props

  useEffect(() => {
    drawImagesOnCanvas1240(props.imagesChoosen, 1240, 1844, dataSelected.frame, '').then(img => {
      setImageDemo(img)
    })

  }, [])

  const handleOnClickChooseFilter = filterName => {
    setFilter(filterName)

    props.onSetLog(prev => prev + `\nSelect Filter ${filterName} at ${moment()}`)
    props.onSetFilter(filterName)

    drawImagesOnCanvas1240(props.imagesChoosen, 1240, 1844, dataSelected.frame, filterName).then(image => {
      setImageDemo(image)
      props.onSetImageForPrint(image)
    })
  }

  return (
    <div className='d-flex justify-content-around commonBackground'>
      <div className='image-demo'>
        <img src={imageDemo} className={`image-show-demo`}></img>
      </div>
      <div>
        <h2 className='text-h2'>Bạn hãy chọn filter cho tấm hình để in nhé.</h2>
        <div className='first-col-filter'>
          {filterFirstCol.map((item) => {
            return <div key={item.name} className={`image-filter-${item.text} ${filter === item.name ? "checked" : ""}`}  onClick={() => handleOnClickChooseFilter(item.name)}>
            </div>
          })}
        </div>
        <div className='second-col-filter mt-4'>
          {filterSecondCol.map((item) => {
            return (
              <div key={item.name} className={`image-filter-${item.text} ${filter === item.name ? "checked" : ""}`} onClick={() => handleOnClickChooseFilter(item.name)}>
              </div>
            )
          })}
        </div>
      </div>
      <Navigation currentStep={5} jumpToStep={props.jumpToStep} maxStep={6} showBack={true} showNext={true}/>
    </div>
  )
}
