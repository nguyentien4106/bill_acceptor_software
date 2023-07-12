import React, { useState, useEffect} from 'react'
import PhotoStrip from '../helpers/PhotoStip';
import ReactHtmlParser from 'react-html-parser';
// import black from '../images/black.jpg'
// import tien from '../images/tien.jpg'

export default function Step4_SelectFilter(props) {
  const {imagesTaken} = props
  const [stripElem, setStripElem] = useState('')
  const [filter, setFilter] = useState('')
  const [photo, setPhoto] = useState(null)

  useEffect(() => {
   console.log(props)

  }, [])

  const download = () => {
    const link = document.createElement('a');
    link.download = 'photostrip.png';
    link.href = photo.generate().toDataURL("image/png");
    link.click();
  }
  return (
    <div className='w-100 d-flex justify-content-around'>
      <div className=''> 

      </div>
      <div className='d-flex justify-content-between'>
        
        <div className='filter'> 
          {imagesTaken.map(item => <img className='image-taken' src={item}></img>)}
        </div>
      </div>
    </div>
  )
}
