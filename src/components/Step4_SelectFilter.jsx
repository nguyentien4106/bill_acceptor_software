import React, { useState, useEffect} from 'react'
import demo from '../images/demo.png'
import 'react-notifications-component/dist/theme.css'
import { Store } from 'react-notifications-component';

export default function Step4_SelectFilter(props) {
  const {imagesTaken} = props
  const [stripElem, setStripElem] = useState('')
  const [filter, setFilter] = useState('')
  const [photo, setPhoto] = useState(null)
  const [imagesChoosen, setImagesChoosen] = useState([])

  const imagesTest = [demo, demo, demo, demo, demo, demo]
  useEffect(() => {
   console.log(props)

  }, [])

  const handleChooseImage = (index) => {
    
    if(imagesChoosen.includes(index)){
      setImagesChoosen(imagesChoosen.filter(item => item != index))
      return
    }

    if(imagesChoosen.length < 4){
      setImagesChoosen([...imagesChoosen, index])

    }
    else {
      Store.addNotification({
        title: "",
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
      <div className=''> 
        This is demo
      </div>
      <div className='d-flex justify-content-between flex-column'>
        <div className='imagesTaken'>
          <div className='first'>
            {imagesTest.map((item, index) => {
              if(index <= 2){
                return <img className={`image-taken m-2 ${imagesChoosen.includes(index) ? "checked" : ""}`} src={item} onClick={() => handleChooseImage(index)}></img>
              }
            })}
          </div>
          <div className='second mt-4'>
            {imagesTest.length >= 3 && imagesTest.map((item, index) => {
              if(index >= 3){
                return <img className={`image-taken m-2 ${imagesChoosen.includes(index) ? "checked" : ""}`} src={item} onClick={() => handleChooseImage(index)}></img>
              }
            })}
          </div>
        </div>
        <div className='filter'> 
          {imagesTaken.map(item => <img className='image-taken' src={item}></img>)}
          Filter Choose here
        </div>
      </div>
    </div>
  )
}
