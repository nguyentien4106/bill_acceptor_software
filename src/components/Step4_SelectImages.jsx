import React, { useState, useEffect} from 'react'
import 'react-notifications-component/dist/theme.css'
import { Store } from 'react-notifications-component';
import {drawImagesOnCanvas} from '../helpers/createPhotoStrip';
import Navigation from './Navigation';
import '../css/Step4.css'
import demo from '../images/demo.jpg'

export default function Step4_SelectImages(props) {
  const {imagesTaken, filter} = props
  const [imagesChoosen, setImageChoosen] = useState([])
  const [photo, setPhoto] = useState(null)
  const imagesTakenTest = [demo, demo, demo, demo, demo, demo]

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
  //   if(imagesChoosen.length === 4){
  //     drawImagesOnCanvas(imagesChoosen, 500, 1200, props.background).then(photo => {
  //       // setImageToPrint(photo)
  //       setPhoto(photo)
  //       props.onSetImageToPrint(photo)
  //     })
  //   }
  // }, [imagesChoosen.length])

  return (
    <div className='selectImagesBackground'>
      {/* <h3>Bạn được chọn tối đa 4 ảnh để in !!!</h3>
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
      </div> */}
      <div className='images-taken'>
        {
          imagesTakenTest.map(item => {
            return <img className={`image m-2 ${imagesChoosen.includes(item) ? "checked" : ""}`} src={item} onClick={() => handleChooseImage(item)}></img>
          })
        }
      </div>
      <Navigation currentStep={4} jumpToStep={props.jumpToStep} maxStep={6}  showBack={true} showNext={true}/>
    </div>
  )
}
