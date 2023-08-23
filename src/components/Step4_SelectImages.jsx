import React, { useState, useEffect} from 'react'
import 'react-notifications-component/dist/theme.css'
import { Store } from 'react-notifications-component';
import {drawImagesOnCanvasTest1240} from '../helpers/createPhotoStrip';
import Navigation from './Navigation';
import '../css/Step4.css'
import demo from '../images/demo.jpg'

export default function Step4_SelectImages(props) {
  const {imagesTaken} = props
  const [imagesChoosen, setImageChoosen] = useState([])
  const [showNext, setShowNext] = useState(false)

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

  useEffect(() => {
    if(imagesChoosen.length === 4){
      setShowNext(true)
      drawImagesOnCanvasTest1240(imagesChoosen, 1240, 1844, props.background).then(photo => {
        props.onSetImageToPrint(photo)
      })
    }
    else {
      setShowNext(false)
    }
  }, [imagesChoosen.length])

  return (
    <div className='selectImagesBackground'>
      <div className='images-taken'>
        {
          imagesTaken.map(item => {
            const index = imagesChoosen.indexOf(item) + 1

            return (
              <div className="container-image">
                <img className={`image m-2 ${imagesChoosen.includes(item) ? "checked" : ""} `} src={item} onClick={() => handleChooseImage(item)}></img>
                {
                  index != 0 && <div class="top-right">{index}</div>
                }
              </div>
            )
          })
        }
      </div>
      <Navigation currentStep={4} jumpToStep={props.jumpToStep} maxStep={6} showBack={false} showNext={showNext}/>
    </div>
  )
}
