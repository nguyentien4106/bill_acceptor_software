import React, { useState, useEffect} from 'react'
import 'react-notifications-component/dist/theme.css'
import { Store } from 'react-notifications-component';
import {drawImagesOnCanvas} from '../helpers/createPhotoStrip';

export default function Step4_SelectImages(props) {
  const {imagesTaken, filter} = props
  const [imagesChoosen, setImageChoosen] = useState([])
  const [photo, setPhoto] = useState(null)
  console.log(filter)
  const handleChooseImage = image => {
    if(imagesChoosen.includes(image)){
      setImageChoosen(imagesChoosen.filter(item => item != image))
      props.onSetImagesChoosen(imagesChoosen.filter(item => item != image))
      return
    }

    if(imagesChoosen.length < 4){
      setImageChoosen([...imagesChoosen, image])
      props.onSetImagesChoosen([...imagesChoosen, image])
    }
    else {
      Store.removeAllNotifications()
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

  // useEffect(() => {
  //   console.log('change')
  //   if(imagesChoosen.length === 4){
  //     drawImagesOnCanvas(imagesChoosen, 500, 1200, props.background).then(photo => {
  //       props.onSetImageToPrint(photo)
  //       setPhoto(photo)
  //     })
  //   }
  // }, [imagesChoosen.length, filter])

  return (
    <div className='w-100 d-flex justify-content-around flex-column mt-5'>
      <h3>Bạn được chọn tối đa 4 ảnh để in !!!</h3>
      <h3>Thứ tự được sắp xếp theo thứ tự bạn chọn nhé !!</h3>
      <div className='d-flex justify-content-around mt-5 '>
        <div className='demo'>
          <img src={photo} className={`image-show ${filter}`}></img>
        </div>
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
      </div>
    </div>
  )
}
