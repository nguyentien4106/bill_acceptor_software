import React, { useEffect, useState } from 'react'
import createPhotoStrip from '../helpers/createPhotoStrip';
import backgroundBlack from '../images/background/black.jpg'
import backgroundWhite from '../images/background/white.jpg'

export default function Step5_Print(props) {
  const {imagesChoosen} = props
  
  const [background, setBackground] = useState(props.background)
  const [photo, setPhoto] = useState(null)
  const [isShow, setIsShow] = useState(false)

  useEffect(() => {
    console.log(background)
    const bg = background.name === "white" ? backgroundWhite : backgroundBlack;

    createPhotoStrip(imagesChoosen, 500, 500, bg).then(photo =>{
      setPhoto(photo)
      setIsShow(true)
    })
  }, [])
  
  return (
    <div>
      <h1>Print Step</h1>
      {
        isShow && <img className='image-show' src={photo}></img>
      }
    </div>
  )
}
