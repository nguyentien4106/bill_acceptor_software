import React, { useState, useEffect} from 'react'
import demo from '../images/demo.jpg'
import 'react-notifications-component/dist/theme.css'
import { Store } from 'react-notifications-component';
import createPhotoStrip from '../helpers/createPhotoStrip';

export default function Step4_SelectFilter(props) {
  const {imagesTaken, background} = props
  const filtersName = ['filter-1977', 'filter-aden', 'filter-amaro', 'filter-ashby', 'filter-brooklyn', 'filter-lofi']
  const [filter, setFilter] = useState(filtersName[0])
  const [imagesChoosen, setImageChoosen] = useState([])


  const handleChooseImage = image => {
    
    if(imagesChoosen.includes(image)){
      console.log('include')
      setImageChoosen(imagesChoosen.filter(item => item != image))
      props.onSetImagesChoosen(imagesChoosen.filter(item => item != image))
      return
    }

    if(imagesChoosen.length < 4){
      console.log('add')
      
      setImageChoosen([...imagesChoosen, image])
      props.onSetImagesChoosen([...imagesChoosen, image])
    }
    else {
      Store.addNotification({
        title: "",
        id: "maxError",
        message: "Bạn chỉ có thể chọn tối đa 4 hình ảnh để in",
        type: "danger",
        insert: "top",
        container: "top-right",
        animationIn: ["animate__animated", "animate__fadeIn"],
        animationOut: ["animate__animated", "animate__fadeOut"],
        dismiss: {
          duration: 3000,
          onScreen: true
        }
      });
    }

  }


  return (
    <div className='w-100 d-flex justify-content-around'>
      <div className='d-flex justify-content-between flex-column'>
        <div className='imagesTaken'>
          <div className='first'>
            {imagesTaken.map((image, index) => {
              if(index <= 2){
                return <img key={index} className={`image-taken m-2 ${imagesChoosen.includes(image) ? "checked" : ""}`} src={image} onClick={() => handleChooseImage(image)}></img>
              }
            })}
          </div>
          <div className='second mt-4'>
            {imagesTaken.length >= 3 && imagesTaken.map((image, index) => {
              if(index >= 3){
                return <img key={index} className={`image-taken m-2 ${imagesChoosen.includes(image) ? "checked" : ""}`} src={image} onClick={() => handleChooseImage(image)}></img>
              }
            })}
          </div>
        </div>
        <div className='filter'> 
          {filtersName.map(filterName => <img key={filterName} className={`${filterName} image-filter-demo ${filter === filterName ? "checked" : ""}`} src={demo} onClick={() => setFilter(filterName)}></img>)}
        </div>
      </div>
    </div>
  )
}
