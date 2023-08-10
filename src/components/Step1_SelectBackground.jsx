import React, { useEffect, useState } from 'react'
import '../css/Step1_SelectBackground.css'
import demo1 from '../images/demo.jpg'
import { drawImagesOnCanvas, getImageWithFilter } from '../helpers/createPhotoStrip';
import { Store } from 'react-notifications-component';

export default function Step1_SelectBackground(props) {
  const imagesDemoUrls = [demo1, demo1, demo1, demo1]
  const [currentPhotoNumber, setCurrentPhotoNumber] = useState(props.currentNumberPhoto)
  const [currentBackground, setCurrentBackground] = useState(props.background)
  const [demoBackground, setDemoBackground] = useState(currentBackground.src);

  const handleClickNumberPhoto = (item) => {
    const audio = document.getElementById("click-audio");
    
    audio.play().then(() => {
      if(item !== 2){
        Store.removeAllNotifications()
        Store.addNotification({
          title: "",
          id: "maxError",
          message: "Hiện tại bạn chỉ có thể chọn 2 ảnh được in. Chúng tôi sẽ hỗ trợ in nhiều ảnh hơn ở phiên bản kế tiếp !",
          type: "warning",
          insert: "top",
          container: "top-right",
          animationIn: ["animate__animated", "animate__fadeIn"],
          animationOut: ["animate__animated", "animate__fadeOut"],
          dismiss: {
            duration: 7000,
            onScreen: true
          }
        })
  
        return
      }
  
      props.onSetNumberPhoto(item)
      setCurrentPhotoNumber(item)
    })
    
  }

  const handleClickBackgroundImage = bg =>{
    const audio = document.getElementById("click-audio");
    audio.play().then(() => {
      props.onSetBackground(bg)
      setCurrentBackground(bg)
    })
  }

  useEffect(() => {
    drawImagesOnCanvas(imagesDemoUrls, 530, 1200, demoBackground)
    .then(canvas => {
      setDemoBackground(canvas)
    })
  })

  useEffect(() => {
    const buttons = document.getElementsByClassName("footer-buttons")[0]
    buttons.style.visibility = 'visible'

    const prev = document.getElementById("prev-button")
    prev.style.visibility = 'hidden'
  })

  useEffect(() => {
    drawImagesOnCanvas(imagesDemoUrls, 530, 1200, currentBackground.src)
      .then(background => {
        setDemoBackground(background)
      })

  }, [currentBackground.name])

  return (
    <div className='step1-container d-flex align-items-start flex-column w-75'>
      <div className='d-flex justify-content-start align-items-start w-100'>
        <legend className='align-items-start justify-content-start'>1. Lựa chọn số lượng </legend>
        <div style={{width: 500}} className='d-flex justify-content-between'>
          {
            props.numberPhotoOptions.map(item => 
              <label key={item} onClick={() => handleClickNumberPhoto(item)} className={currentPhotoNumber === item ? "checked number-photo-option" : "number-photo-option"}>
                {item} Ảnh
              </label>
            )
          }
        </div>
      </div>  
      <hr/>
      <div className='d-flex justify-content-around align-items-around mt-4 w-100'>
        <legend className='align-self-center'>2. Lựa chọn phông nền</legend>
        <div style={{width: 500}} className='d-flex justify-content-between w-100'>
          <div className='demo'>
            <img className='image-show' src={demoBackground}></img>
          </div>
          <div className='selection d-flex flex-column align-self-center'>
            {
              props.backgroundsImage.map(item => <img key={item.name}
                                                  src={item.src} onClick={() => handleClickBackgroundImage(item)} 
                                                  className={currentBackground.name === item.name ? "image-background-demo-selected" : "image-background-demo"}
                                                />)
            }
          </div>
        
        </div>
      </div>
    </div>

  )
}
