import React, { useState, useEffect } from 'react'
import StepZilla from "react-stepzilla";
import Step1_SelectBackground from './Step1_SelectBackground';
import Step2_Payment from './Step2_Payment';
import Step3_TakePhoto from './Step3_TakePhoto';
import Step4_SelectFilter from './Step4_SelectFilter';
import Step5_Print from './Step5_Print';
import createPhotoStrip from '../helpers/createPhotoStrip';

export default function Progress(props) {
  const numberPhotoOptions = [2, 4 ,6]
  const backgroundUrls = ['../images/black.jpg', '../images/white.jpg', '../images/background.jpg']
  const [numberPhoto, setNumberPhoto] = useState(2)
  const [backgroundUrl, setBackgroundUrl] = useState(backgroundUrls[0])
  const [imageStrip, setImageStrip] = useState(null)
  const [stripElem, setStripElem] = useState('')

  const getPhotoStrip = (image) => {
    setImageStrip(image)
  }

  useEffect(() => {
    const images = [];
    for (let i = 1; i <= 4; i++) {
      const image = new Image();
      image.src = '../images/demo.jpg'
      images.push(image);
    }
    const background = new Image()
    background.src = backgroundUrl

    // createPhotoStrip(images, 500, 500, background, 11).then(dataUrl => {
    //   // const img = document.createElement('img');
    //   // img.src = dataUrl;
    //   console.log(dataUrl)
    // })
  }, [])
  const steps =
    [
      {name: 'Chọn phông nền ảnh', component: <Step1_SelectBackground 
                                                numberPhotoOptions={numberPhotoOptions}
                                                onSetNumberPhoto={numberPhoto => setNumberPhoto(numberPhoto)}
                                                currentNumberPhoto={numberPhoto}
                                                backgroundUrls={backgroundUrls}
                                                onSetBackgroundUrl={url => setBackgroundUrl(url)}
                                                currentBackgroundUrl={backgroundUrl}
                                              />},

      {name: 'Xác nhận thanh toán', component: <Step2_Payment 
                                                  money={props.money} 
                                                  numberPhoto={numberPhoto}
                                                  onGetPhotoStrip={getPhotoStrip}
                                                />},

      {name: 'Chụp ảnh', component: <Step3_TakePhoto 

                                    />},
      {name: 'Chọn filter', component: <Step4_SelectFilter />},
      {name: 'Printing', component: <Step5_Print />}
    ]
    
  return (
    <div className='step-progress'>
        <StepZilla 
          steps={steps}
          // startAtStep={3} 
          backButtonCls={"button-4"} 
          backButtonText={"Quay lại"} 
          nextButtonText={"Kế tiếp"}
          nextButtonCls={"button-4 yellow"}
        />
    </div>
  )
}
