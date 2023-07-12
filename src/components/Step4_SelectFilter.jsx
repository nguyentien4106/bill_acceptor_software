import React, { useState, useEffect} from 'react'
import PhotoStrip from '../helpers/PhotoStip';
import ReactHtmlParser from 'react-html-parser';
// import black from '../images/black.jpg'
// import tien from '../images/tien.jpg'

export default function Step4_SelectFilter() {

  const [stripElem, setStripElem] = useState('')
  const [filter, setFilter] = useState('')
  const [photo, setPhoto] = useState(null)

  useEffect(() => {
    // const images = [
    //   'https://www.kasandbox.org/programming-images/avatars/duskpin-sapling.png',
    //   'https://www.kasandbox.org/programming-images/avatars/duskpin-seed.png',
    //   'https://www.kasandbox.org/programming-images/avatars/duskpin-seedling.png',
    //   'https://www.kasandbox.org/programming-images/avatars/duskpin-seedling.png'
    // ];

    // const photoStrip = new PhotoStrip(images, black);
    // setPhoto(photoStrip)
    // setStripElem(ReactHtmlParser(photoStrip.nodeToString()))
    // console.log(stripElem)

  }, [])

  const download = () => {
    const link = document.createElement('a');
    link.download = 'photostrip.png';
    link.href = photo.generate().toDataURL("image/png");
    link.click();
  }
  return (
    <div>
      <h1>Select Filter step</h1>
      <div className='d-flex justify-content-between'>
        <div className='image'>
          <figure className='filter-1977'>
            {stripElem}
          </figure>
        </div>
        <div className='filter'> 

        </div>

        <button onClick={download}>Download</button>
      </div>
    </div>
  )
}
